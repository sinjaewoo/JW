class Exam01 extends Phaser.Scene{

    constructor(){  // Scene 에서 사용할 변수나 함수를 초기화 하는 곳
        super("Exam01");
    }

    preload(){  // Scene에 사용될 이미지, 음악, 영상등의 자원을 로딩하는 곳 ( RAM에 적재 작업 )

    }

    create(){   // RAM에 적재된 자원을 바탕으로 인스턴스를 생성하는 곳
        this.cameras.main.setBackgroundColor("#ffffff");

        this.player = this.physics.add.sprite(100,100,50,50);   // 플레이어 주인공 캐릭터
        this.player.setCollideWorldBounds(true);

        this.box = this.physics.add.sprite(205,250,50,50);
        this.box.setCollideWorldBounds(true);
        // this.box.setImmovable(true); // sprite 움직임 고정
        this.box.setBounce(1);  // 탄성
        this.box.setDrag(10);   // 공기저항
        this.box.setMass(5);    // sprite의 질량값



        this.physics.add.collider(this.player, this.box, function(player,box){
            console.log("충돌 감지");
        });

        this.cursor = this.input.keyboard.createCursorKeys(); // 키보드 조작을 처리하기 위한 인스턴스
    }

    update(){   // 무한루프를 반복하며 게임 내용을 채우는 곳 ( 기본 60 fps )

        if(this.cursor.left.isDown){
            // this.player.x -= 1;
            this.player.setVelocityX(-300);
        }else if(this.cursor.right.isDown){
            // this.player.x += 1;
            this.player.setVelocityX(300);
        }else{
            this.player.setVelocityX(0);
        }
        
        if(this.cursor.up.isDown){
            // this.player.y -= 1;
            this.player.setVelocityY(-300);
        }else if(this.cursor.down.isDown){
            // this.player.y += 1;
            this.player.setVelocityY(300);
        }else{
            this.player.setVelocityY(0);
        }

    }

}