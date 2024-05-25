import numpy as np
from transformers import BertTokenizer, BertModel
import torch
from numpy.linalg import norm

class EmbeddingModel:
    
    def __init__(self, 
                 k=10, 
                 metric_='cos'):
        self.k = k
        self.metric_ = metric_
        self.model = BertModel.from_pretrained('bert-base-uncased')
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.logger=print

    @torch.no_grad()
    def generate_emb(self, 
                     input_ : list, 
                     debug=False) -> np.array:
        # input_ = ' '.join(input_)
        if debug:
            self.logger("Sentence: {}".format(input_))
        input_ = self.tokenizer.tokenize(input_)
        if debug:
            self.logger("Tokens: {}".format(input_))
        output_ = self.tokenizer.convert_tokens_to_ids(input_)
        if debug:
            self.logger("IDs: {}".format(output_))
        output_ = torch.tensor(output_).unsqueeze(0)
        return self.model(output_).last_hidden_state[:, 0, :].numpy()

    def score(self, 
              x_ , 
              y_) -> float:
        x = x_.reshape((x_.shape[1],))
        y = y_.reshape((y_.shape[1],))
        if self.metric_ == 'cos':
            s_ = np.dot(x, y) / (norm(x) * norm(y))
        elif self.metric_ == 'l1':
            s_ = np.abs(x - y)
        elif self.metric_ == 'l2':
            s_ = (x - y) ** 2
        else:
            raise NotImplementedError
        print("score: {}".format(s_))
        return s_
    
    def create_pool(self, 
                    u_emb : np.array, 
                    a_embs : dict) -> list:
        scores = {}
        for k, v in a_embs.items():
            s_ = self.score(u_emb, v)
            scores[k] = s_
        scores = sorted(scores.items(), key=lambda x : x[1], reverse=True)
        scores = [x[0] for x in scores]
        if len(scores) > self.k:
            return scores[:self.k]
        else:
            return scores
