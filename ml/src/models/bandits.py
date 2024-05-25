import numpy as np

class BanditPolicy:

    def __init__(self, 
                 init_='pes', 
                 weigh_dist=True,
                 beta=0.7
                 ):
        self.alpha_0_phi = 1
        self.alpha_1_phi = 1
        self.weigh_dist = weigh_dist
        if init_ == 'pes': # pessimistic sampling
            self.alpha_0_phi = 99
        else:
            raise NotImplementedError
        self.beta = beta

    def normalise_dist_map(self, dist_map : dict) -> dict:
        min_ = min(dist_map.values())
        max_ = max(dist_map.values())
        dist_map = {k : (1 - (max_ - v) / (max_ - min_)) for k, v in dist_map.items()}

    def get_recommendation(self, click_map : dict, dist_map : dict, t : int) -> list[str]:
        score_map = {k : self.score(v, t - v) for k, v in click_map.items()}
        if self.weigh_dist:
            dist_map = self.normalise_dist_map(dist_map)
            score_map = {k : self.beta * v + (1 - self.beta) * dist_map[k] 
                         for k, v in score_map.items()}
        score_map = sorted(score_map.items(), key=lambda x : x[1], reverse=True)
        return [str(x[0]) for x in score_map]

    def score(self, clicked : int, nclicked : int) -> float:
        return np.random.beta(self.alpha_1_phi 
                              + clicked, self.alpha_0_phi + nclicked)
