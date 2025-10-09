const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer();
const io = socketIo(server, { cors: { origin: '*' } });

let players = {};

io.on('connection', (socket) => {
    console.log('Player connected:', socket.id);

    socket.on('join', (data) => {
        players[socket.id] = {
            x: data.x,
            y: data.y,
            btype: data.btype,
            htype: data.htype,
            hcolor: data.hcolor,
            selectedCharacter: data.selectedCharacter,
            selectedCharacterC: data.selectedCharacterC,
            selectedCharacterB: data.selectedCharacterB
        };
        io.emit('state', players);
    });

    socket.on('move', (input) => {
        const player = players[socket.id];
        if (!player) return;
        const velocity = 3;

        // Determine direction
        let direction = player.direction || 'down';
        if (input.left && input.up) direction = 'up_left';
        else if (input.right && input.up) direction = 'up_right';
        else if (input.left && input.down) direction = 'down_left';
        else if (input.right && input.down) direction = 'down_right';
        else if (input.left) direction = 'left';
        else if (input.right) direction = 'right';
        else if (input.up) direction = 'up';
        else if (input.down) direction = 'down';
        else direction = 'idle';

        player.direction = direction;

        // Move player
        if (input.left) player.x -= velocity;
        if (input.right) player.x += velocity;
        if (input.up) player.y -= velocity;
        if (input.down) player.y += velocity;

        io.emit('state', players);
    });

    socket.on('dodge', ({ dx, dy }) => {
        const player = players[socket.id];
        let dodgeDistance = 64;

        if (!player) return;

        player.x += dx * dodgeDistance;
        player.y += dy * dodgeDistance;
        
        io.emit('dodge', { id: socket.id, x: player.x, y: player.y });
        setTimeout(() => {
            io.emit('state', players);
        }, 200); // Match client tween duration
    });

    socket.on('chat', ({ message }) => {
        io.emit('chat', { id: socket.id, message });
    });

    socket.on('animation', ({ type }) => {
        io.emit('animation', { id: socket.id, type });
    });

    socket.on('disconnect', () => {
        console.log('Player disconctd:', socket.id);
        delete players[socket.id];
        io.emit('state', players);
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});