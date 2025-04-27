from presidio_analyzer import AnalyzerEngine
from pii_detection.ocr import extract_text_from_image

analyzer = AnalyzerEngine()

def detect_pii_text(text):
    results = analyzer.analyze(text=text, language='en')
    entities = [{"entity": r.entity_type, "start": r.start, "end": r.end, "score": r.score} for r in results]
    return entities

def detect_pii_from_file(file_path):
    if file_path.endswith(('.png', '.jpg', '.jpeg')):
        text = extract_text_from_image(file_path)
    else:
        # Assume it's a text-based PDF (or pre-extracted text)
        with open(file_path, 'r') as f:
            text = f.read()
    return detect_pii_text(text)
                                                                                                                                                                                                                                                                                                                                                                                                                                                