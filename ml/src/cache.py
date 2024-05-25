import redis as rd
import numpy as np
import struct

import msgpack
import msgpack_numpy as m

m.patch()

class Cache:

    def __init__(self):
        pool = rd.ConnectionPool(host = 'redis', port = 6379)#, decode_responses=True)
        self.r = rd.StrictRedis(connection_pool=pool)
        self.r.flushall()

        self.emb = set()

        try:
            self.r.ping()
        except ConnectionError:
            print("Failed to connect")
            exit(0)

    
    def cache(self, 
              k : str, 
              v : np.array) -> None:
        v = self.serialise(v)
        self.r.set(k, v)
        self.emb.add(k)
    
    def get_all_emb(self) -> dict:
        ret_mp = {}
        for k in self.emb:
            v = self.r.get(k)
            v = self.deserialise(v)
            ret_mp[k] = v
        return ret_mp
    
    def serialise(self, 
                  emb : np.array):
        # h, w = emb.shape
        # print("serialising | h: {} | w: {}".format(h, w))
        # shp = struct.pack('>II', h, w)
        # return shp + emb.tobytes()
        return m.packb(emb)

    def deserialise(self, 
                    rout) -> np.array:
        # h, w = struct.unpack('>II', rout[:8])
        # print("deserialisation | h: {} | w: {}".format(h, w))
        # ret = np.frombuffer(rout[8:])
        # print(ret.shape)
        # ret = ret.reshape(h, w)
        # print(ret.shape)
        ret = m.unpackb(rout)
        return ret
