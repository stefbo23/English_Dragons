*{
margin:0;
padding:0;
box-sizing:border-box;
}

body{

font-family:Arial,Helvetica,sans-serif;

background:#0f172a;

color:white;

overflow-x:hidden;

}

header{

background:#111827;

padding:20px;

box-shadow:0 0 20px rgba(0,0,0,.5);

text-align:center;

}

h1{

color:#ffb703;

font-size:40px;

margin-bottom:15px;

}

h2{

margin-bottom:20px;

color:#8ecae6;

}

#playerBar{

display:flex;

justify-content:center;

gap:40px;

font-size:22px;

font-weight:bold;

}

main{

padding:30px;

max-width:900px;

margin:auto;

}

button{

padding:18px;

margin:12px;

font-size:22px;

border:none;

border-radius:15px;

cursor:pointer;

background:#fb8500;

color:white;

transition:.25s;

box-shadow:0 5px 15px rgba(0,0,0,.4);

}

button:hover{

transform:scale(1.05);

background:#ffb703;

color:black;

}

.hidden{

display:none;

}

.worldMap{

display:flex;

align-items:center;

justify-content:center;

flex-wrap:wrap;

margin-top:50px;

}

.node{

width:120px;

height:120px;

border-radius:50%;

background:#219ebc;

display:flex;

flex-direction:column;

justify-content:center;

align-items:center;

font-size:45px;

box-shadow:0 0 20px cyan;

animation:pulse 2s infinite;

}

.node p{

font-size:18px;

margin-top:5px;

}

.node.active{

background:#2ecc71;

box-shadow:0 0 35px lime;

}

.road{

width:90px;

height:8px;

background:white;

}

#wordList{

display:grid;

grid-template-columns:repeat(auto-fit,minmax(180px,1fr));

gap:20px;

}

.wordCard{

background:#1e293b;

padding:20px;

border-radius:20px;

text-align:center;

transition:.25s;

cursor:pointer;

}

.wordCard:hover{

transform:scale(1.05);

background:#334155;

}

.wordEmoji{

font-size:60px;

}

.wordEnglish{

font-size:26px;

color:#ffb703;

margin-top:10px;

}

.wordGerman{

font-size:20px;

color:#ddd;

}

#memoryBoard{

display:grid;

grid-template-columns:repeat(4,1fr);

gap:15px;

margin-top:25px;

}

.memoryCard{

height:120px;

background:#334155;

border-radius:15px;

display:flex;

justify-content:center;

align-items:center;

font-size:34px;

cursor:pointer;

transition:.25s;

user-select:none;

}

.memoryCard:hover{

transform:scale(1.05);

}

.memoryCard.open{

background:#2ecc71;

color:black;

}

.memoryCard.done{

background:#ffb703;

color:black;

}

@keyframes pulse{

0%{

transform:scale(1);

}

50%{

transform:scale(1.08);

}

100%{

transform:scale(1);

}

}

@media(max-width:700px){

#memoryBoard{

grid-template-columns:repeat(2,1fr);

}

.node{

width:90px;

height:90px;

font-size:35px;

}

button{

width:100%;

}

}
