export async function fetchData(url: string, options: RequestInit, retry = true): Promise<Response> {
    let response = await fetch(url, options);

    if (response.status === 401 && retry) {
        console.log('***********');
        console.log('401');
        console.log('***********');

        const refreshResponse = await fetch('http://localhost:5001/api/auth/refresh', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });
        if (refreshResponse.ok) {
            console.log('***********');
            console.log('успешный рефреш');
            console.log('***********');
            const refreshData = await refreshResponse.json();
            localStorage.setItem('accessToken', refreshData.accessToken);
            const token = refreshData.accessToken;
            if (options.headers instanceof Headers) {
                options.headers.set('Authorization', `Bearer ${token}`);
            } else if (typeof options.headers === 'object' && options.headers !== null) {
                options.headers = {
                    ...options.headers,
                    'Authorization': `Bearer ${token}`,
                };
            }
            response = await fetch(url, options);
        } else {
            console.log('***********');
            console.log('нужен редирект');
            console.log('***********');
            window.location.href = '/login';
            throw new Error('Refresh token истек. Войдите в аккаунт');
        }
    }
    return response;
}
