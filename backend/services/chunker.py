def chunk_pages(
    pages,
    chunk_size=1000,
    overlap=200
):
    all_chunks = []

    for page in pages:

        text = page["text"]

        start = 0

        while start < len(text):

            end = start + chunk_size

            all_chunks.append({
                "text": text[start:end],
                "page": page["page"]
            })

            start += chunk_size - overlap

    return all_chunks