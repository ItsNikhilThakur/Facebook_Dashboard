import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function Dashboard() {
    const [likes, setLikes] = useState(167);
    const [comments, setComments] = useState(4);
    const [shares, setShares] = useState(5);

    useEffect(() => {
        const accessToken = 'EAAQk0BjGHGYBO4nAzgssZBENOPI7wp6UMZC6474Kjc7g95U4r8qpTZBZAlAhLsadnkt0PdQ9nGaqDyfF3lJ7dQSA3RxQ773g60Gv7OZAjV0FipN23WZCioF3mwrysFlYXjwOlhh07bqO6p2yrWCIGUfzJ4plC42wAkQivwoZCpJR9xouGulyWVZC5lZAbFyGESuP9ZAuzwkz4jJTS3s4NjxH16cF2ihGGrtZCCUZBvzx0YJmKmLewqEutAZCKtwwuoI6n2gZDZD';
        const postId = '122110211438277103';

        axios.get(`https://graph.facebook.com/v13.0/${postId}?fields=likes.summary(true),comments.summary(true),shares&access_token=${accessToken}`)
            .then(response => {
                const { likes, comments, shares } = response.data;
                setLikes(likes.summary.total_count);
                setComments(comments.summary.total_count);
                setShares(shares ? shares.count : 0);
            })
            .catch(error => {
                console.error('Error fetching post metrics:', error);
            });
    }, []);

    return (
        <div className="container">
            <div className="header">
                <img src="/facebook-icon.png" alt="Facebook Icon" className="facebook-icon" />
                <div className="blue-strip"></div>
            </div>
            <h1>Facebook Post Performance</h1>
            <div id="postMetrics" className="metrics-container">
                <div className="metric">
                    <h3>Likes</h3>
                    <p>{likes}</p>
                </div>
                <div className="metric">
                    <h3>Comments</h3>
                    <p>{comments}</p>
                </div>
                <div className="metric">
                    <h3>Shares</h3>
                    <p>{shares}</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
