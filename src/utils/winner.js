export const checkWinner = (squares, player, img, setWinner, setPlayer) => {
    const checkPawns = squares.find((square) => square.img === img);

    if (!checkPawns) {
        setWinner(true);
        return alert(`Le Joueur ${player} à gagné !`);
    }

    const whoNext = player === "1" ? 2 : 1;

    return setPlayer(Number(whoNext));
};
