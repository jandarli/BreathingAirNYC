import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from scipy import stats



# Get the KDE values for the tree data 
tree_path = '/Volumes/USB20FD/Spring2017/Visualization/Project/Project_Data/2015_Street_Tree_Census_-_Tree_Data.csv'

tree_df = pd.read_csv(tree_path, usecols=['latitude', 'longitude'])
tree_latitudes = tree_df.latitude.tolist()
tree_longitudes = tree_df.longitude.tolist()

xmint, xmaxt = min(tree_latitudes), max(tree_latitudes)
ymint, ymaxt = min(tree_longitudes), max(tree_longitudes)

X_tree, Y_tree = np.mgrid[xmint:xmaxt:100j, ymint:ymaxt:100j]
positionst = np.vstack([X_tree.ravel(), Y_tree.ravel()])
valuest = np.vstack([tree_latitudes, tree_longitudes])
kernelt = stats.gaussian_kde(valuest)
Z_tree = np.reshape(kernelt(positionst).T, X_tree.shape)

'''
fig = plt.figure()
fig.set_size_inches(30, fig.get_figwidth(), forward=True)
ax = fig.add_subplot(111)
ax.imshow(np.rot90(Z), cmap=plt.cm.gist_earth_r,extent=[xmin, xmax, ymin, ymax])
ax.plot(latitudes, longitudes, 'k.', markersize=2)
ax.set_xlabel("Latitude")
ax.set_ylabel("Longitude")
ax.set_xlim([xmin, xmax])
ax.set_ylim([ymin, ymax])
ax.set_title("KDE of Tree Data")
plt.show()
'''

# Get the KDE values for the air Quality Complaints
air_path = 'Volumes/USB20FD/Spring2017/Visualization/Project/Project_Data/Air_Quality_Complaints.csv'
air_df = pd.read_csv(air_path, usecols=['Latitude', 'Longitude'])
air_latitudes = air_df.latitude.tolist()
air_longitudes = air_df.longitude.tolist()

xmina, xmaxa = min(air_latitudes), max(air_latitudes)
ymina, ymaxa = min(air_longitudes), max(air_longitudes)

X_air, Y_air = np.mgrid[xmina:xmaxa:100j, ymina:ymaxa:100j]
positionsa = np.vstack([X_air.ravel(), Y_air.ravel()])
valuesa = np.vstack([air_latitudes, air_longitudes])
kernela = stats.gaussian_kde(valuesa)
Z_air = np.reshape(kernela(positionsa).T, X_air.shape)



