from fastapi import FastAPI, HTTPException, APIRouter
from src import MLServer
from pydantic import BaseModel
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.encoders import jsonable_encoder

class Entry(BaseModel):
    id : str
    desc : str

class CurrentState(BaseModel):
    click_map : dict
    dist_map : dict
    t : int

app = FastAPI()
router = APIRouter()

server_wrapper = MLServer()

@app.get("/")
def root():
    return RedirectResponse(url='/docs')

@router.get("/adduser/", response_model=list[str])
async def adduser(user: Entry):
    status, resp = server_wrapper.add_new_user(user.id, user.desc)
    if status:
        raise HTTPException(status_code=400, detail=resp)
    return resp

@router.get("/addevent/", response_model=str)
async def addevent(event: Entry):
    status, resp = server_wrapper.add_new_event(event.id, event.desc)
    if status:
        raise HTTPException(status_code=400, detail=resp)
    return "Added Event"

@router.get("/recommend/", response_model=list[str])
async def recommend(cstate : CurrentState):
    status, resp = server_wrapper.get_reccomendation(cstate.click_map, 
                                            cstate.dist_map,
                                            cstate.t)
    if status:
        raise HTTPException(status_code=400, detail=resp)
    return resp

app.include_router(router)