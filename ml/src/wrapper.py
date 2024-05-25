from .models import BanditPolicy, EmbeddingModel
import numpy as np
from .cache import Cache
 
class MLServer:

    def __init__(self):
        self.embedding_model : EmbeddingModel = EmbeddingModel()
        self.policy : BanditPolicy = BanditPolicy()
        self.db : Cache = Cache()

    def add_new_user(self, 
                     uid : str, 
                     udesc : str) -> tuple:
        try:
            u_emb = self.embedding_model.generate_emb(udesc)
            a_emb_pool = self.db.get_all_emb()
            a_emb_pool = self.embedding_model.create_pool(u_emb, a_emb_pool)
        except Exception as e:
            return (True, repr(e))
        return (False, a_emb_pool)

    def add_new_event(self, 
                      eid : str, 
                      edesc : str) -> tuple:
        
        e_emb = self.embedding_model.generate_emb(edesc)
        self.db.cache(eid, e_emb)

        try:
            e_emb = self.embedding_model.generate_emb(edesc)
            self.db.cache(eid, e_emb)
        except Exception as e:
            return (True, repr(e))
        
        return (False, None)

    def get_recommendation(self, 
                           user_click_map : dict,
                           t : int) -> tuple:
        try:
            ret = self.policy.get_recommendation(user_click_map, t)
        except Exception as e:
            return (True, repr(e))
        return (False, ret)
