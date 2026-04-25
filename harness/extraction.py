import re

HARD_MODALS = re.compile(
    r'\b(must|shall|cannot|required|never|always|will not|are required to'
    r'|do not|shall not|must not|is required|are not|may not)\b',
    re.IGNORECASE
)

COMMITMENT_CONTENT = re.compile(
    r'\$\d'                               # monetary amount
    r'|\b\d+%\b'                          # percentage obligation
    r'|\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b'
    r'|\b(january|february|march|april|may|june|july|august'
    r'|september|october|november|december)\b'
    r'|\b(if|unless|when)\b.{0,60}\b(deal|agreement|contract|payment|obligation|close|finalize)\b',
    re.IGNORECASE
)

def extract_commitment_words(text: str) -> set:
    """
    Extract the key words from commitment-bearing sentences.
    Returns a set of normalized words (>2 chars).
    """
    sentences = re.split(r'(?<=[.!?;])\s+', text.strip())
    words = set()
    for sent in sentences:
        if HARD_MODALS.search(sent) or COMMITMENT_CONTENT.search(sent):
            words.update(
                w.lower() for w in re.findall(r'\b[a-zA-Z0-9\$%]+\b', sent)
                if len(w) > 2
            )
    return words

def jaccard(a: set, b: set) -> float:
    if not a and not b:
        return 1.0
    if not a or not b:
        return 0.0
    return round(len(a & b) / len(a | b), 3)
