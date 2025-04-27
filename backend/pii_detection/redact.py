from presidio_anonymizer import AnonymizerEngine
from presidio_analyzer import AnalyzerEngine

analyzer = AnalyzerEngine()
anonymizer = AnonymizerEngine()

def redact_text(text):
    analyzed_results = analyzer.analyze(text=text, language='en')
    anonymized_text = anonymizer.anonymize(text=text, analyzer_results=analyzed_results)
    return anonymized_text.text
