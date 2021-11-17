import { useEffect, useState } from 'react';

const Test = () => {
    const [triggered, setTriggered] = useState(false);

    useEffect(() => {
        const testData = {
            Token: '-----BEGIN PGP MESSAGE-----\nVersion: ProtonMail\n\nwV4DQ4/qiemGQmgSAQdAlTOYhArB1+BoiZ0ZbXYBHPQ21XwT8jNaQWYl271v\nXFUwmL0Seo3t3fQrD4EGtEGKKRUcDEFJAS8EMNVQHdmtJhO9gqdmr+AN5kOk\nE19ntegA0ngBFW9jQuxz8EOmWY1PCX5gYqDSEwY9DOD1jvC4RuQ510s+Iu6E\nHAD7yyusnuzxDjTps6rXnKMOo651Fk7EQ8pEKn75PzXYiSFuFu6zabiavUIP\n9N5OWg4NLDYwgQunSlQn7vwepzY0ejIKYwArOav+7HA9EeL0Xwk=\n=ZLSN\n-----END PGP MESSAGE-----\n',
            Signature:
                '-----BEGIN PGP SIGNATURE-----\nVersion: ProtonMail\n\nwnUEARYKAAYFAmGUyv8AIQkQIZPUo36Bi5sWIQQwNksOgLNKQ7WMptMhk9Sj\nfoGLm37KAQD8GenEnYUCOctq9pMZ+BQuIeRyOEnkEBUsk31rBpGH9QD+LuFy\nGgbPHuMXnPblU9oQjuXJ9wBRrym2cny9mNXWaAw=\n=nSHx\n-----END PGP SIGNATURE-----\n',
            privateKeys: [
                '-----BEGIN PGP PRIVATE KEY BLOCK-----\r\nVersion: OpenPGP.js v4.10.10\r\nComment: https://openpgpjs.org\r\n\r\nxVgEYZTKwxYJKwYBBAHaRw8BAQdA/o9nZjHKomBWPETlh9FcWQFqvGN7AIXp\r\nUMXLyWoOs7cAAQD8snkBNqVp61mSGUVs3sIWuTpDU3ccf08yPlg54PM1SQ3/\r\nzTtub3RfZm9yX2VtYWlsX3VzZUBkb21haW4udGxkIDxub3RfZm9yX2VtYWls\r\nX3VzZUBkb21haW4udGxkPsKPBBAWCgAgBQJhlMrDBgsJBwgDAgQVCAoCBBYC\r\nAQACGQECGwMCHgEAIQkQIZPUo36Bi5sWIQQwNksOgLNKQ7WMptMhk9SjfoGL\r\nm2qyAQDUJ7xkj/jQ3zRspxY5WCzZf6MLKlvdCRNQT9PFbXiMnwD/RaSDRZRr\r\nnMzOhrUU9gZJrhPIQOFCyAc3KpiJBsALxwLHXQRhlMrDEgorBgEEAZdVAQUB\r\nAQdAvDxliFlAVsgi9AnsTQRo1XCjFyoICjNadx4YNCrCGH0DAQgHAAD/S37Z\r\nRfkn1HwoXkQyUl4Ua/8ud23wUQYDJyDszLFHX7gO6sJ4BBgWCAAJBQJhlMrD\r\nAhsMACEJECGT1KN+gYubFiEEMDZLDoCzSkO1jKbTIZPUo36Bi5tTDgD/Zbo9\r\nsU4pemSXQxM7waIwwr5VA2P6IyUMnRMPJlUqpUoBAOCZfwYUIUaxJD+5AWE1\r\nYMjBtNDMQ/cn+zTDjomNL/IH\r\n=tXlp\r\n-----END PGP PRIVATE KEY BLOCK-----\r\n',
            ],
        };
        const run = async () => {
            const privateKeys = await Promise.all(
                testData.privateKeys.map(async (x) => (await window.openpgp.key.readArmored(x)).keys[0])
            );
            const result = await window.openpgp.decrypt({
                message: await window.openpgp.message.readArmored(testData.Token),
                signature: await window.openpgp.message.readArmored(testData.Signature),
                privateKeys,
                publicKeys: privateKeys.map((x) => x.toPublic()),
            });
            console.log('Successfully decrypted', result);
        };

        setTimeout(() => {
            setTriggered(true);
            run();
        }, 1000);

        run();
    }, []);

    return <div>{triggered ? 'Crash triggered' : 'Loading...'}</div>;
};

export default Test;
