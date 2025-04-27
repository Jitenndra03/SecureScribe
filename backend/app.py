import os
from flask import Flask, request, jsonify, send_file
from werkzeug.utils import secure_filename
from pii_detection.detect import detect_pii_from_file
from pii_detection.redact import redact_text
from pii_detection.ocr import extract_text_from_image
from pii_detection.utils import allowed_file

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "Backend running fine!"}), 200

@app.route('/detect', methods=['POST'])
def detect_pii():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in request"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        try:
            pii_entities = detect_pii_from_file(filepath)
            os.remove(filepath)  # Clean up after processing
            return jsonify({"pii_entities": pii_entities}), 200
        except Exception as e:
            os.remove(filepath)
            return jsonify({"error": str(e)}), 500

    return jsonify({"error": "Unsupported file type"}), 400

@app.route('/redact', methods=['POST'])
def redact_pii_route():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in request"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        try:
            # Extract text depending on file type
            if filepath.endswith(('.png', '.jpg', '.jpeg')):
                text = extract_text_from_image(filepath)
            else:
                with open(filepath, 'r') as f:
                    text = f.read()

            redacted_text = redact_text(text)

            # Save redacted text to a file
            redacted_path = os.path.join(app.config['UPLOAD_FOLDER'], f"redacted_{filename}.txt")
            with open(redacted_path, 'w') as f:
                f.write(redacted_text)

            os.remove(filepath)  # Clean up original file
            return send_file(redacted_path, as_attachment=True)

        except Exception as e:
            os.remove(filepath)
            return jsonify({"error": str(e)}), 500

    return jsonify({"error": "Unsupported file type"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
