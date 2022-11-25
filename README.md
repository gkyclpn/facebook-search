# Initialize Project
- npm install
- node graph.js

# Problem
Make an algorithm about suggesting friends related to given friendship dataset and the suggestion has to be related to user's friends of friend's. The suggestion:
- isn't the user,
- isn't its friends
- is its friends of friend's

# Solving
I used Javascript map data structure for getting user's friendship and its friendship of friend's. When i am getting that i used DFS (Depth-First Search) algorithm. After that i count the frequency of suggestable friends and sort it.