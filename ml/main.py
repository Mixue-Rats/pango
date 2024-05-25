from fastapi import FastAPI, HTTPException, APIRouter
from src import MLServer, process_description
from pydantic import BaseModel
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.encoders import jsonable_encoder

class UserEntry(BaseModel):
    email : str = None
    preferredVolunteerType : str = None
    skills : list[str] = None 
    personalityTraits : list[str] = None
    additionalPreferences : str = None

class EventEntry(BaseModel):
    event_id : str = None
    desc : str = None


# class CurrentState(BaseModel):
#     event_key : int = None

class TotalState(BaseModel):
    click_map : dict = None
    # dist_map : dict = None
    # t : int = None

app = FastAPI()
router = APIRouter()

server_wrapper = MLServer()

@app.get("/")
def root():
    return RedirectResponse(url='/docs')

@router.post("/adduser/", response_model=list[str])
async def adduser(user: UserEntry):
    id = user.email
    desc = process_description(user)
    status, resp = server_wrapper.add_new_user(id, desc)
    if status:
        raise HTTPException(status_code=400, detail=resp)
    return resp

@router.post("/addevent/", response_model=str)
async def addevent(event: EventEntry):
    status, resp = server_wrapper.add_new_event(event.event_id, 
                                                event.desc)
    if status:
        raise HTTPException(status_code=400, detail=resp)
    return "Added Event : {}".format(event.event_id)

@router.post("/recommend/", response_model=list[str])
async def recommend(cstate : TotalState):
    cm = cstate.click_map

    t = sum(cm.values())
    status, resp = server_wrapper.get_recommendation(cstate.click_map, t)
    if status:
        raise HTTPException(status_code=400, detail=resp)
    return resp

app.include_router(router)