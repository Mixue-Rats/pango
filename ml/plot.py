# %%
import numpy as np
from src import EmbeddingModel

# %%
model = EmbeddingModel()

# %%
# # users: 3 x skills, 1 x interest area
# user_stats = ["Leadership", "Communication", "IT", "Environmental"]
# user_stats = " ".join(user_stats)

# # companies: 3 x skills needed, 1 x domain of volunteering
# COMPANY_DOMAIN = ["Community", "Education", "Animals", "Kids", 
#                   "Environment", "Social", "Elderly", "Disaster Relief"]
# COMPANY_TRAITS_NEEDED = ["Commitment", "IT", "Good with Kids", 
#                          "Medical Knowledge", "CPR trained", "CPR",
#                          "Teamwork", "Communication", "Leadership",
#                          "Chinese", "English", "Teaching background", "Passionate"]

# # Generate random company requests
# company_stats = {}
# for i in range(10):
#     domain = np.random.randint(0, len(COMPANY_DOMAIN)-1)
#     domain = COMPANY_DOMAIN[domain]

#     traits = np.random.choice(np.arange(0, len(COMPANY_TRAITS_NEEDED)-1, 1), 
#                               size=(3,), replace=False)
#     company_ = []
#     for j in traits:
#         company_.append(COMPANY_TRAITS_NEEDED[j])
#     company_.append(domain)
#     company_stats["Company_{}".format(i)] = company_

# %%
company_stats = {}
test_list = [
    "Park clean-up for Environmental Conservation, \
    looking for people that have Physical stamina with the willingness to work outdoors",

    "Soup kitchen assistance, looking for people with basic cooking skills, empathy and teamwork, \
    Most importantly, we want people with the willingness to serve!",

    "Tree planting at west coast, need people that have physical fitness with the ability to work with tools.",

    "Help run a charity event! Need people with communication and prior event management skills.",

    "Teach kids to paint, need people with painting skills, \
    people that are good with kids and people that have an eye for detail.",

    "Elderly nursing home visit. Just need people that are compassionate with good communication",

    "Homeless shelter donations. No prior skills required.",

    "Neighborhood clean-up, looking for teamwork skills! Ready to work in a comunnity?",

    "Beach clean-up, looking for people w physical stamina and willingness to spread awareness on the environment",

    "Habitat for Humanity building. Great if have prior construction skills but not needed, \
    looking for people that work well in a team."
]

volunteering_events = [
    "Help with a community garden project. Volunteers should have gardening knowledge and enjoy working outdoors.",
    "Assist at a local animal shelter. Volunteers should be compassionate towards animals and have good people skills.",
    "Organize a neighborhood clean-up. Volunteers should work well in a team and be detail-oriented.",
    "Help with a food drive for the homeless. Volunteers should have organizational skills and be able to coordinate donations.",
    "Support a literacy program for adults. Volunteers should be patient and have good communication skills.",
    "Participate in a beach clean-up event. Volunteers should be physically fit and environmentally conscious.",
    "Assist at a community soup kitchen. Volunteers should have basic cooking skills and be empathetic towards those in need.",
    "Provide companionship to elderly residents in a nursing home. Volunteers should be good listeners and enjoy social interaction.",
    "Help organize a charity fundraiser. Volunteers should have event planning skills and be able to solicit donations.",
    "Support a local school by tutoring students. Volunteers should have knowledge of the subject matter and be patient teachers.",
    "Assist with disaster relief efforts. Volunteers should be adaptable and able to work well under pressure.",
    "Participate in a tree planting initiative. Volunteers should be physically fit and able to work with tools.",
    "Support veterans with job search assistance. Volunteers should have knowledge of job search techniques and be good communicators.",
    "Provide translation services for immigrant communities. Volunteers should be fluent in multiple languages and culturally sensitive.",
    "Help organize a sports day for children. Volunteers should be energetic and enjoy working with kids.",
    "Assist with an environmental education program. Volunteers should have knowledge of environmental issues and enjoy teaching.",
    "Support a community arts project. Volunteers should be creative and able to work collaboratively.",
    "Provide emotional support to individuals in crisis. Volunteers should be empathetic and able to remain calm under pressure.",
    "Help at a blood donation drive. Volunteers should have organizational skills and be good at interacting with donors.",
    "Participate in a river clean-up initiative. Volunteers should be physically fit and environmentally conscious.",
    "Assist at a senior center with recreational activities. Volunteers should be patient and enjoy working with the elderly.",
    "Support a mentorship program for at-risk youth. Volunteers should be positive role models and good listeners.",
    "Help organize a community health fair. Volunteers should have event planning skills and be knowledgeable about health topics.",
    "Participate in a habitat restoration project. Volunteers should be physically fit and able to work outdoors.",
    "Assist with job training programs for the homeless. Volunteers should have relevant professional skills and be able to mentor others.",
    "Support a community theater production. Volunteers should have skills in acting, directing, or behind-the-scenes production.",
    "Help with a technology workshop for seniors. Volunteers should have knowledge of computers and be patient teachers.",
    "Assist with a disaster preparedness training. Volunteers should have knowledge of emergency procedures and be able to communicate effectively.",
    "Participate in a community recycling program. Volunteers should be environmentally conscious and able to sort recyclable materials.",
    "Support a community outreach program for mental health awareness. Volunteers should be empathetic and able to provide resources and support."
]

test_list += volunteering_events

for i in range(0, len(test_list)):
    company_stats["Company_{}".format(i)] = test_list[i]

# %%
pref = "environmental"

skill_ls = ["technology", "outdoors", "ok with physical work"]

add_pref = "I prefer volunteering activities that involve outdoor tasks and environmental conservation."

user_stats =  "I mainly prefer volunteering for {} events. ".format(pref) + add_pref  +\
    "I have the following skills and interests " + ", ".join(skill_ls) + ". "

# %%
user_stats

# %%
user_emb = model.generate_emb(user_stats)
company_emb = {}
for company_, v in company_stats.items():
    company_e = model.generate_emb(" ".join(v))
    company_emb[company_] = company_e 

# %%
user_emb.shape

# %%
company_emb['Company_0'].shape

# %%
company_score = {}
for company_, v in company_emb.items():
    company_score[company_] = model.score(v, user_emb)

# %%
final_res = model.create_pool(user_emb, company_emb)

# %%
import matplotlib.pyplot as plt
from sklearn.manifold import TSNE

def visualize_embeddings(u_ed, embeddings, words, stats):
    tsne = TSNE(n_components=3, random_state=0, perplexity=len(words)-1)
    temp_ = [embeddings[word][0] for word in words]
    words = [stats[word] for word in words]
    temp_.append(u_ed[0])
    words.append("User")
    embedding_vectors = np.array(temp_)
    two_d_embeddings = tsne.fit_transform(embedding_vectors)

    user_final = two_d_embeddings[-1]

    fig = plt.figure(figsize=(5, 20))
    ax = plt.axes(projection='3d')
    for i, word in enumerate(words):
        x, y, z = two_d_embeddings[i, :]
        ax.scatter(x, y, z)
    ax.text(user_final[0] + 1, user_final[1] + 1, user_final[2] + 1, "User")
    plt.show()

visualize_embeddings(user_emb, company_emb, list(company_emb.keys()), company_stats)

# %%



