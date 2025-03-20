import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const UnreadMessages: React.FC = () => {
    const [messagesCount, setMessagesCount] = useState(0);
    const [lastMessageDate, setLastMessageDate] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        setMessagesCount(Math.floor(Math.random() * 10) + 1);

        const now = new Date();
        const formatter = new Intl.DateTimeFormat('ru-RU', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });

        setLastMessageDate(formatter.format(now));
    }, []);

    return (
        <div>
            <p>
                { t('unreadMessages', { count: messagesCount })}
            </p>
            <p> ({lastMessageDate}) </p>
        </div>
    );
}

export default UnreadMessages;