from pathlib import Path

from pypdf import PdfReader

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

def cleanup_uploads():
    if UPLOAD_DIR.exists():
        for file in UPLOAD_DIR.iterdir():
            if file.is_file():
                try:
                    file.unlink()
                except Exception:
                    pass


def save_pdf(file):
    file_path = UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    return file_path


def extract_pages(file_path: Path):
    reader = PdfReader(file_path)

    pages = []

    for page_number, page in enumerate(reader.pages, start=1):
        text = page.extract_text()

        if text:
            pages.append({
                "page": page_number,
                "text": text
            })

    return pages