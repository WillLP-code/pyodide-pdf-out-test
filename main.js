async function run_python() {
    let pyodide = await loadPyodide();
    await pyodide.loadPackage(["pandas", "micropip"]);
    
    // load initial python packages
    await pyodide.runPythonAsync(` 
    import micropip
    await micropip.install('plotly==5.0.0')

    import pandas as pd
    import js
    import pyodide_js
    import json
    import io
    import plotly.express as px
    import plotly.graph_objects as go


    import pandas as pd 
    import plotly.express as px 

    df = pd.DataFrame({"x":[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    "y":[0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100]})

    fig = px.scatter(df["x"], df["y"])
    js.document.plot = fig.to_html(include_plotlyjs=False, full_html=False, default_height="350px")

    `)

    let plot_id = document.getElementById("plot")
    render_plot(plot_id, document.plot)

    $(".spinner").addClass('d-none');
    $("#submit").addClass('d-none')
    $("#print").removeClass('d-none');
}

function render_plot(container, plot_html) {
    let range = document.createRange();
    range.selectNode(container);
    let documentFragment = range.createContextualFragment(plot_html);
    while (container.hasChildNodes()) {  
    container.removeChild(container.firstChild);
    }
    container.appendChild(documentFragment);
    container.className = "plotly";
}; 