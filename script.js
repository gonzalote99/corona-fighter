function load_images() {
virus_image = new Image();
virus_image.src = 'https://raw.githubusercontent.com/God-father1/Javascript-projects/master/Corona%20Fighter%20Game/Assets/virus.svg';

player_img = new Image();
player_img.src = 'https://raw.githubusercontent.com/God-father1/Javascript-projects/master/Corona%20Fighter%20Game/Assets/doctor.png';

gem_img = new Image();
gem_img.src = 'https://raw.githubusercontent.com/God-father1/Javascript-projects/master/Corona%20Fighter%20Game/Assets/india.png';
}

function init() {
  canvas = document.getElementById('mycanvas');
  console.log(canvas);
  W = 1450;
  H = 645;

  canvas.width = W;
  canvas.height = H;

  pen = canvas.getContext('2d');
  console.log(pen);

  score = 0;
  health = 100;
  game_over = false;

  e1 = {
    x: 150 ,
    y: 50,
    w: 100,
    h: 100,
    speed: 35 ,
  };
  e2 = {
    x: 350,
    y: 150,
    w: 100,
    h: 100,
    speed: 60,
  };
  e3 = {
    x: 550,
    y: 200,
    w: 100,
    h: 100,
    speed: 70,
  };
  e4 = {
    x: 750,
    y: 190,
    w: 100,
    h: 100,
    speed: 50,
  };
  e5 = {
    x: 950,
    y: 100,
    w: 100,
    h: 100,
    speed: 40,
  };
  e6 = {
    x: 1150,
    y: 220,
    w: 100,
    h: 100,
    speed: 80 ,
  }

  enemy = [e1, e2, e3, e4, e5, e6];

  player = {
    x: 10,
    y: H / 2 - 50,
    w: 100,
    h: 100,
    speed: 35,
    moving: 'false'
  };


  gem = {
    x : W - 100,
    y : H / 2 - 50,
    w: 100,
    h: 100,
  };

  canvas.addEventListener('mousedown', function() {
    player.moving = true;
  });

  canvas.addEventListener('mouseup', function() {
    player.moving = false;
  });

  document.addEventListener('keydown', function(e)  {
     if(e) {
       player.moving = true;
     }
  });

  document.addEventListener('keyup', function() {
    
      player.moving = false;
    
  });

}

  function draw() {
    pen.clearRect(0 ,0, W, H);

    pen.drawImage(player_img, player.x, player.y, player.w, player.h);
    pen.drawImage(gem_img, gem.x, gem.y, gem.w, gem.h );

    for(let i = 0; i < enemy.length; i++) {
      pen.drawImage(virus_image, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
    }

    pen.fillStyle = 'white';
    pen.font = '25px Verdana';

    pen.fillText('score: ' + score, 10, 30 );
    pen.fillText('health: ' + health, 10, 60);

    
  }

  function isColliding(b1, b2) {
      if(Math.abs(b1.x - b2.x) <= 50 && Math.abs(b1.y - b2.y) <= 50) {
        return true;
      }
      return false;

  }

  function update() {
    if(player.moving == true) {
      player.x += player.speed;
      score += 25;
    }
    for(let i = 0; i < enemy.length; i++ ) {
      enemy[i].y += enemy[i].speed;
      if(enemy[i].y > H - enemy[i].h || enemy[i].y < 0) {
        enemy[i].speed *= -1;
      }
    }

    for(let i = 0; i < enemy.length; i++) {
     if(isColliding(enemy[i], player )) {
       score -= (i+1) * 100;
       health -= (i+1) * 10;
       if(score <= 0) {
        score = 0;
       }
       if(health <=0 ) {
         health = 0;
         game_over = true;
         alert('game over');
       }
     }
    }

    if(isColliding(gem, player)) {
      game_over = true;
      if(health === 100) {
        score += 75;
        alert('perfect score:' + score);
      } else {
        alert('you score: ' + score);
      }
    }


  }


  function gameLoop() {
    if(game_over == true) {
      clearInterval(game)
    }
    draw();
    update();
  }

  load_images();
  init();


  let game = setInterval(gameLoop, 100);

