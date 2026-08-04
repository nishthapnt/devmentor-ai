import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",
)


def chat_with_llm(question: str, context: str, history: list):
    messages = [
        {
            "role": "system",
            "content": """
You are DevMentor AI.

Use ONLY the retrieved context.

If the answer isn't present,
say you couldn't find it.

At the end of every answer,
mention the provided sources naturally.
"""
        }
    ]

    messages.extend(history)

    messages.append({
        "role": "user",
        "content": f"""
Context

{context}

Question

{question}
"""
    })

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages
    )

    return response.choices[0].message.content