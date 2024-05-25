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
              x : np.array, 
              y : np.array) -> float:
        x = x.reshape((x.shape[1],))
        y = y.reshape((y.shape[1],))
        if self.metric_ == 'cos':
            s_ = np.dot(x, y) / (norm(x) * norm(y))
        elif self.metric_ == 'l1':
            s_ = np.abs(x - y)
        elif self.metric_ == 'l2':
            s_ = (x - y) ** 2
        else:
            raise NotImplementedError
        return s_