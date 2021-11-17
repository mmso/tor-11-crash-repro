const loadScriptHelper = ({ path, integrity }, cb) => {
    const script = document.createElement('script');

    script.src = path;
    if (integrity) {
        script.integrity = integrity;
    }
    script.onload = (e) => {
        cb(e);
        script.remove();
    };
    script.onerror = (e) => cb(undefined, e);

    document.head.appendChild(script);
};

export const loadScript = (path, integrity) => {
        return new Promise((resolve, reject) => {
            loadScriptHelper({ path, integrity }, (event, error) => {
                if (error || !event) {
                    return reject(error);
                }
                return resolve(event);
            });
        });
    }
;

export const initScript = async (openpgpContents) => {
    const mainUrl = URL.createObjectURL(new Blob([openpgpContents], { type: 'text/javascript' }));
    await loadScript(mainUrl);
    URL.revokeObjectURL(mainUrl);
};

export const initWorker = async (openpgpContents, openpgpWorkerContents) => {
    const workerUrl = URL.createObjectURL(
        new Blob(['self.window = self;', openpgpContents, openpgpWorkerContents], {
            type: 'text/javascript',
        })
    );
    const { hardwareConcurrency = 1 } = window.navigator || {};
    window.openpgp.initWorker({ path: workerUrl, n: hardwareConcurrency });
    window.URL.revokeObjectURL(workerUrl);
};
