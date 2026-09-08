from fastapi import APIRouter

router = APIRouter()

@router.get("/favorites")
def favorites():
    data = "momo"
    return data