class Exam02 extends Phaser.Scene{

    constructor(){  
        super({key:"Exam02"});
        this.boxes = [];
        this.boundaries = []; // boundaries 배열 초기화
        this.frame = 0;
        this.timer = 0;
        this.tileSpeed = 2;
    }

    init(){ // scene이 start 될 때마다( 다시 시작 될 떄 ) 실행되는 함수 ( 초기화 역할 )
        this.timer = 0;
    }

    preload(){  
        this.load.image('player', 'image/pplayer.png'); // 플레이어 이미지 로드
        this.load.image('box', 'image/box.png'); // 상자 이미지 로드
        this.load.image('background', 'image/background.png');
    }

    create(){   
        this.cameras.main.setBackgroundColor("#ffffff");

        this.background = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'background');
        this.background.setOrigin(0,0);
        
        // 경계 생성 및 추가
        this.boundaries.push(this.add.rectangle(0, this.cameras.main.height + 30, this.cameras.main.width, 5, 0x000000));
        this.boundaries.push(this.add.rectangle(0, -30, this.cameras.main.width, 5, 0x000000));
        this.boundaries.push(this.add.rectangle(-30, 0, 5, this.cameras.main.height, 0x000000));
        this.boundaries.push(this.add.rectangle(this.cameras.main.width + 30, 0, 5, this.cameras.main.height, 0x000000));

        for(let boundary of this.boundaries){
            boundary.setOrigin(0, 0);
            this.physics.add.existing(boundary, true); // 경계를 물리 객체로 추가, true는 immovable 설정
        }

        this.player = this.physics.add.sprite(250, 250, 'player'); // 플레이어 생성
        // this.player.setScale(35 / 512); // 플레이어 크기 조정 / 원본 이미지 사이즈 = scaleFactor
        // this.player.setSize(30 / (35/512));

        let scaleFactor = 35 / 512;
        this.player.setScale(scaleFactor); // 플레이어 크기 조정 / 원본 이미지 사이즈 = scaleFactor
        this.player.setSize(15 / scaleFactor , 15 / scaleFactor);

        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.boxes, () => {
            // 충돌 시 처리 로직
            // alert("게임 Over");
            this.scene.start("GameOver");

        });

        this.timerText = this.add.text(this.cameras.main.width - 10, 10, '0', {
            fontSize: '32px',
            fill: '#FF0000'
        }).setOrigin(1, 0);

        this.cursor = this.input.keyboard.createCursorKeys();
    }

    update(){  
        this.frame++;
        this.background.tilePositionY -= 2;

        if(this.frame % 60 == 0){
            this.timer++;
            this.timerText.setText(this.timer);
        }

        if(this.frame % 30 == 0){
            let box = this.physics.add.sprite(Math.random() * (480 - 20 + 1) + 20, 20, 'box');
            box.setVelocityY(Math.random() * (200 - 100 + 1) + 100);
            box.setScale(40/300);
            this.boxes.push(box);

            if(this.timer >= 10){
                let box2 = this.physics.add.sprite(Math.random() * (480 - 20 + 1) + 20, this.cameras.main.height, 'box');
                box2.setVelocityY((Math.random() * (200 - 100 + 1) + 100) * -1);
                box2.setScale(40/300);
                this.boxes.push(box2);

                this.tileSpeed = 5;
            }

            if(this.timer >= 20){
                let box3 = this.physics.add.sprite(this.cameras.main.width, Math.random() * (480 - 20 + 1) + 20, 'box');
                box3.setVelocityX((Math.random() * (200 - 100 + 1) + 100) * -1);
                box3.setScale(40/300);
                this.boxes.push(box3);

                let box4 = this.physics.add.sprite(0, Math.random() * (480 - 20 + 1) + 20, 'box');
                box4.setVelocityX(Math.random() * (200 - 100 + 1) + 100);
                box4.setScale(40/300);
                this.boxes.push(box4);

                this.tileSpeed = 10;
            }
        }

        if(this.cursor.left.isDown){
            this.player.setVelocityX(-300);
        }else if(this.cursor.right.isDown){
            this.player.setVelocityX(300);
        }else{
            this.player.setVelocityX(0);
        }
        
        if(this.cursor.up.isDown){
            this.player.setVelocityY(-300);
        }else if(this.cursor.down.isDown){
            this.player.setVelocityY(300);
        }else{
            this.player.setVelocityY(0);
        }
    }
}
