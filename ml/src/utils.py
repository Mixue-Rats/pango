from pydantic import BaseModel

def process_description(user : BaseModel) -> str:
    pref = user.preferredVolunteerType
    skill_ls = user.skills
    add_pref = user.additionalPreferences

    pref_ = "I mainly prefer volunteering for {} events. ".format(pref)
    skills_ = "I have the following skills and interests " + ", ".join(skill_ls) + ". "
    # pt_ = "My personality traits are " + ",".join(pt_ls) + ". "
    return pref_ + add_pref + skills_ #+ pt_
