from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2") # loads pre trained model
#now model is an object that knows how to convert text into vectors.
#all-MiniLM-L6-v2, the vector has 384 dimensions.


def get_embedding(text: str):
    return model.encode(text).tolist() # model.encode() returns a NumPy array.