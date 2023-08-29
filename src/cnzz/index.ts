(() => {
    const cnzzs: { href: string; id?: string; ck?: string; src: string }[] = [
        {
            href: "",
            id: "",
            ck: "",
            src: "",
        },
    ];
    const _cnzzs = cnzzs.filter(item => window.location.href.includes(item.href));
    _cnzzs?.forEach(item => {
        if (item.src.includes("sdk.51.la")) {
            const script_: HTMLScriptElement = document.createElement("script");
            script_.defer = true;
            script_.charset = "UTF-8";
            script_.id = "LA_COLLECT";
            script_.src = item.src;
            document.body.appendChild(script_);
            script_.onload = () => {
                const _script: HTMLScriptElement = document.createElement("script");
                _script.innerHTML = `LA.init({ id: '${item.id}', ck: '${item.ck}' })`;
                document.body.appendChild(_script);
            };
            return;
        }
        if (item.src.includes("googletagmanager")) {
            const script_: HTMLScriptElement = document.createElement("script");
            script_.defer = true;
            script_.src = item.src;
            document.body.appendChild(script_);
            script_.onload = () => {
                const _script: HTMLScriptElement = document.createElement("script");
                _script.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${item.id}');
                `;
                document.body.appendChild(_script);
            };
            return;
        }
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = item.src;
        script.defer = true;
        document.body.appendChild(script);
    });
})();
