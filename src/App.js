import { Suspense, lazy, useEffect, useState } from 'react';
import openpgpSrc from '!!raw-loader!openpgp/dist/openpgp';
import openpgpWorker from '!!raw-loader!openpgp/dist/openpgp.worker';
import { initScript, initWorker } from './helper';

const transformWorkerContents = (contents) => contents.replace("importScripts('openpgp.js');", '');

const LazyLoadedComponent = lazy(() => import('./Test'));

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const run = async () => {
            await initScript(openpgpSrc);
            await initWorker(openpgpSrc, transformWorkerContents(openpgpWorker));
        };
        run().then(() => setLoading(false));
    }, []);

    if (loading) {
        return 'Loading';
    }

    return (
        <Suspense fallback="Loading">
            <LazyLoadedComponent />
        </Suspense>
    );
};

export default App;
