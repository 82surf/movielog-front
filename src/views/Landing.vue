<template>
  <div>
    <!-- Carousel -->
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </ol>
      <div class="carousel-inner" role="listbox">
        <div class="carousel-item active">
          <picture>
            <source srcset="@/assets/landing/mockup-2000.jpg" media="(min-width: 1400px)">
            <source srcset="@/assets/landing/mockup-1400.jpg" media="(min-width: 769px)">
            <source srcset="@/assets/landing/mockup-800.jpg" media="(min-width: 577px)">
            <img srcset="@/assets/landing/mockup-600.jpg" alt="responsive image" class="d-block img-fluid">
          </picture>

          <div class="carousel-caption text-end" style="color: black">
            <div>
              <h2>간편하고 예쁘게</h2>
              <p>
                간단한 리뷰 작성으로
                <br>
                나만의 영화 리뷰 모음을 만들어보세요.
              </p>
              <span class="btn btn-sm btn-primary" @click="clickSignup">지금 시작하기</span>
            </div>
          </div>
        </div>
        <!-- /.carousel-item -->
        <div class="carousel-item">
          <picture>
            <source srcset="@/assets/landing/web-2000.jpg" media="(min-width: 1400px)">
            <source srcset="@/assets/landing/web-1400.jpg" media="(min-width: 769px)">
            <source srcset="@/assets/landing/web-800.jpg" media="(min-width: 577px)">
            <img srcset="@/assets/landing/web-600.jpg" alt="responsive image" class="d-block img-fluid landing-img-filter">
          </picture>

          <div class="carousel-caption text-start" style="color: white">
            <div>
              <h2>친구들과 함께</h2>
              <p>친구를 팔로우하고 리뷰에 좋아요를 눌러보세요.</p>
            </div>
          </div>
        </div>
        <!-- /.carousel-item -->
        <div class="carousel-item">
          <picture class="landing-img-filter">
            <source srcset="@/assets/landing/rec-2000.jpg" media="(min-width: 1400px)">
            <source srcset="@/assets/landing/rec-1400.jpg" media="(min-width: 769px)">
            <source srcset="@/assets/landing/rec-800.jpg" media="(min-width: 577px)">
            <img srcset="@/assets/landing/rec-600.jpg" alt="responsive image" class="d-block img-fluid landing-img-filter">
          </picture>

          <div class="carousel-caption text-end">
              <div>
                <h2>SNS 활동 기반 영화 추천</h2>
                <p>팔로우, 좋아요 등의 활동을 바탕으로한
                  <br>
                  취향 저격 영화를 추천받아보세요.
                </p>
                <span class="btn btn-sm btn-primary" @click="clickSignup">지금 시작하기</span>
              </div>
          </div>
        </div>
          <!-- /.carousel-item -->
      </div>
      <!-- /.carousel-inner -->
      <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <!-- /.carousel -->
  
  
    <!-- Marketing messaging and featurettes
    ================================================== -->
    <!-- Wrap the rest of the page in another container to center all the content. -->
  
    <div class="container marketing">
  
  
      <!-- START THE FEATURETTES -->
  
      <hr class="featurette-divider">
  
      <div class="row featurette">
        <div class="col-md-7">
          <h2 class="featurette-heading">Less, but better</h2>
          <p class="lead">심플하고 깔끔하게 영화 리뷰를 기록하고, 나눠보세요.</p>
        </div>
        <div class="col-md-5">
          <img class="img-fluid mx-auto" src="@/assets/landing/profile-500.jpg" alt="">
  
        </div>
      </div>
  
      <hr class="featurette-divider">
  
      <div class="row featurette">
        <div class="col-md-7 order-md-2">
          <h2 class="featurette-heading">맞춤형 영화 추천</h2>
          <p class="lead">팔로우, 좋아요 등 SNS 활동 기반 알고리즘으로 맞춤형 영화를 추천해드려요.</p>
        </div>
        <div class="col-md-5 order-md-1">
          <img class="img-fluid mx-auto" src="@/assets/landing/rec-500.jpg" alt="">
  
        </div>
      </div>
  
      <hr class="featurette-divider">

      <!-- 제작자 -->
      <div class="row">
        <!-- 이진석 -->
        <div class="col-lg-6 d-flex flex-column align-items-center">
          <img src="@/assets/landing/ljs.jpg" style="width:140px; height:140px; border-radius: 50%;" alt="">
  
          <h2 class="my-3">이진석</h2>
        </div><!-- /.col-lg-4 -->

        <!-- 유현수 -->
        <div class="col-lg-6 d-flex flex-column align-items-center">
          <img src="@/assets/landing/rhs.jpg" style="width:140px; height:140px; border-radius: 50%;" alt="">
  
          <h2 class="my-3">유현수</h2>
        </div><!-- /.col-lg-4 -->
      </div><!-- /.row -->

      <hr class="featurette-divider">
  
      <!-- /END THE FEATURETTES -->
  
    </div><!-- /.container -->
  
  
    <!-- FOOTER -->
    <footer class="container">
      <p>SSAFY Final PJT</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Landing',
  methods: {
    clickSignup: function () {
      const signupBtn = document.querySelector('#signupBtn')
      signupBtn.click()
    }
  }
}
</script>

<style scoped>

/*
Removes white gap between slides - chagnge to base color of slide images
*/
.carousel {
  background:#007aeb;
}

/*
Forces image to be 100% width and not max width of 100%
*/
.carousel-item .img-fluid {
  width:100%;
}

/* 
anchors are inline so you need ot make them block to go full width
*/
.carousel-item a {
  display: block;
  width:100%;
}
.landing-img-filter {
  filter: brightness(60%);
}
/* MARKETING CONTENT
-------------------------------------------------- */

/* Center align the text within the three columns below the carousel */
.marketing .col-lg-4 {
  margin-bottom: 1.5rem;
  text-align: center;
}
.marketing h2 {
  font-weight: 400;
}
/* rtl:begin:ignore */
.marketing .col-lg-4 p {
  margin-right: .75rem;
  margin-left: .75rem;
}
/* rtl:end:ignore */


/* Featurettes
------------------------- */

.featurette-divider {
  margin: 5rem 0; /* Space out the Bootstrap <hr> more */
}

/* Thin out the marketing headings */
.featurette-heading {
  font-weight: 300;
  line-height: 1;
  /* rtl:remove */
  letter-spacing: -.05rem;
}


/* RESPONSIVE CSS
-------------------------------------------------- */

@media (min-width: 40em) {
  /* Bump up size of carousel content */
  .carousel-caption p {
    margin-bottom: 1.25rem;
    font-size: 1.25rem;
    line-height: 1.4;
  }

  .featurette-heading {
    font-size: 50px;
  }
}

@media (min-width: 62em) {
  .featurette-heading {
    margin-top: 7rem;
  }
}
</style>