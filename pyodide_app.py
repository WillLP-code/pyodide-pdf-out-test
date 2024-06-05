import pandas as pd 
import plotly.express as px 

df = pd.DataFrame({"x":[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                  "y":[0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100]})

fig = px.scatter(df["x"], df["y"])
js.document.plot = fig.to_html(include_plotlyjs=False, full_html=False, default_height="350px")
