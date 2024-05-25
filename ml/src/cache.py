import redis as rd
import numpy as np
import struct

class Cache:

    def __init__(self):
        pool = rd.ConnectionPool(host = 'redis', port = 6379)
        self.r = rd.Redis(connection_pool=pool)
        try:
            self.r.ping()
        except ConnectionError:
            print("Failed to connect")
            exit(0)

    
    def cache(self, 
              k : str, 
              v : np.array) -> None:
        v = self.serialise(v)
        self.r.set(str(k), v)
    
    def get_all_emb(self) -> dict:
        k_ = self.r.keys('*')
        ret_mp = {}
        for k in k_:
            v = self.r.get(k)
            v = self.deserialise(v)
            ret_mp[k] = v
        return ret_mp
    
    def serialise(self, 
                  emb : np.array):
        h, w = emb.shape
        shp = struct.pack('>II', h, w)
        return shp + emb.tobytes()

    def deserialise(self, 
                    rout) -> np.array:
        h, w = struct.unpack('>II', rout[:8])
        return np.frombuffer(rout[8:]).reshape(h, w)