from fastapi import APIRouter
from app.schemas.atbash import Atbash

router = APIRouter(prefix="/atbash")

def atbash(text):
    english = "abcdefghijklmnopqrstuvwxyz"
    english_reverse = english[::-1]

    hebrew = "אבגדהוזחטיכלמנסעפצקרשת"
    hebrew_reverse = hebrew[::-1]

    result = ""

    for char in text:
        if char.lower() in english:
            index = english.index(char.lower())
            encrypted = english_reverse[index]

            if char.isupper():
                encrypted = encrypted.upper()

            result += encrypted

        elif char in hebrew:
            index = hebrew.index(char)
            result += hebrew_reverse[index]

        else:
            result += char

    return result


@router.post("/")
def encrypt(data: Atbash):
    return {"result": atbash(data.text)}