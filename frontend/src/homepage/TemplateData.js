const templates = [
  {
    name: "Blank",
    src: "https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png",
    text: "",
  },
  {
    name: "Resume",
    src: "https://ssl.gstatic.com/docs/templates/thumbnails/10bJALGfGJG8BrzBSmG6EznIq6-84l1TZkQ-HC8jO368_400.png",
    text: '<h1><strong style="background-color: transparent; color: rgb(247, 93, 93);">Hello</strong></h1><h1><strong style="background-color: transparent; color: rgb(0, 0, 0);">I’m Your Name</strong></h1><p><br></p><h4><span style="background-color: transparent; color: rgb(0, 0, 0);">123 YOUR STREET</span></h4><h4><span style="background-color: transparent; color: rgb(0, 0, 0);">YOUR CITY, ST 12345</span></h4><h4><strong style="background-color: transparent; color: rgb(0, 0, 0);">(123) 456-7890</strong></h4><h4><strong style="background-color: transparent; color: rgb(0, 0, 0);">NO_REPLY@EXAMPLE.COM</strong></h4><p><br></p><h2><strong style="background-color: transparent; color: rgb(247, 93, 93);">Skills</strong></h2><p><span style="background-color: transparent; color: rgb(0, 0, 0);">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac interdum nisi. Sed in consequat mi. Sed pulvinar lacinia felis eu finibus.</span></p><p><br></p><h2><strong style="background-color: transparent; color: rgb(247, 93, 93);">Experience</strong></h2><h4><span style="background-color: transparent; color: rgb(102, 102, 102);">MONTH 20XX - PRESENT</span></h4><h4><strong style="background-color: transparent; color: rgb(0, 0, 0);">Company Name, Location</strong><em style="background-color: transparent; color: rgb(0, 0, 0);"> - Job Title</em></h4><ul><li><span style="background-color: transparent;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.&nbsp;</span></li><li><span style="background-color: transparent;">Aenean ac interdum nisi. Sed in consequat mi.</span></li><li><span style="background-color: transparent;">Sed in consequat mi, sed pulvinar lacinia felis eu finibus.</span></li></ul><h3><br></h3><h4><span style="background-color: transparent; color: rgb(102, 102, 102);">MONTH 20XX - MONTH 20XX</span></h4><h4><strong style="background-color: transparent; color: rgb(0, 0, 0);">Company Name, Location</strong><em style="background-color: transparent; color: rgb(0, 0, 0);"> - Job Title</em></h4><ul><li><span style="background-color: transparent;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.&nbsp;</span></li><li><span style="background-color: transparent;">Aenean ac interdum nisi. Sed in consequat mi.&nbsp;</span></li></ul><p><br></p><h4><span style="background-color: transparent; color: rgb(102, 102, 102);">MONTH 20XX - MONTH 20XX</span></h4><h4><strong style="background-color: transparent; color: rgb(0, 0, 0);">Company Name, Location</strong><em style="background-color: transparent; color: rgb(0, 0, 0);"> - Job Title</em></h4><ul><li><span style="background-color: transparent;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.&nbsp;</span></li><li><span style="background-color: transparent;">Aenean ac interdum nisi. Sed in consequat mi.&nbsp;</span></li><li><span style="background-color: transparent;">Sed pulvinar lacinia felis eu finibus.&nbsp;</span></li></ul><p><br></p><h2><strong style="background-color: transparent; color: rgb(247, 93, 93);">Education</strong></h2><h4><span style="background-color: transparent; color: rgb(102, 102, 102);">MONTH&nbsp; 20XX - MONTH 20XX</span></h4><h3><strong style="background-color: transparent; color: rgb(0, 0, 0);">College Name, Location</strong><em style="background-color: transparent; color: rgb(0, 0, 0);"> - Degree</em></h3><p><span style="background-color: transparent; color: rgb(0, 0, 0);">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.</span></p><p><br></p><h2><strong style="background-color: transparent; color: rgb(247, 93, 93);">Awards</strong></h2><p><span style="background-color: transparent; color: rgb(0, 0, 0);">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span></p><p><span style="background-color: transparent; color: rgb(0, 0, 0);">Aenean ac interdum nisi.&nbsp;</span></p><p><br></p><p><br></p>',
  },
  {
    name: "Letter",
    src: "https://ssl.gstatic.com/docs/templates/thumbnails/10e8_E36oj6_LuCRzckBFX_9oqbCHntmYB-jxB5U9gsw_400_2.png",
    text: '<p><strong style="color: rgb(53, 55, 68); background-color: transparent;"></strong></p><h6><strong style="color: rgb(0, 138, 0); background-color: rgb(0, 138, 0);">――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――</strong></h6><p><br></p><p><strong style="color: rgb(53, 55, 68); background-color: transparent;">Your Name</strong></p><p><span style="color: rgb(102, 102, 102); background-color: transparent;">123 Your Street</span></p><p><span style="color: rgb(102, 102, 102); background-color: transparent;">Your City, ST 12345</span></p><p><span style="color: rgb(102, 102, 102); background-color: transparent;">(123) 456-7890</span></p><p><span style="color: rgb(102, 102, 102); background-color: transparent;">no_reply@example.com</span></p><p><br></p><p><span style="color: rgb(53, 55, 68); background-color: transparent;">4th September 20XX</span></p><p><br></p><p><br></p><p><strong style="color: rgb(53, 55, 68); background-color: transparent;">Ronny Reader</strong></p><p><span style="color: rgb(53, 55, 68); background-color: transparent;">CEO, Company Name</span></p><p><span style="color: rgb(53, 55, 68); background-color: transparent;">123 Address St&nbsp;</span></p><p><span style="color: rgb(53, 55, 68); background-color: transparent;">Anytown, ST 12345</span></p><p><br></p><p><span style="color: rgb(53, 55, 68); background-color: transparent;">Dear Ms. Reader,</span></p><p><br></p><p class="ql-align-justify"><span style="color: rgb(53, 55, 68); background-color: transparent;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</span></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><span style="color: rgb(53, 55, 68); background-color: transparent;">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.</span></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><span style="color: rgb(53, 55, 68); background-color: transparent;">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.</span></p><p><br></p><p><span style="color: rgb(53, 55, 68); background-color: transparent;">Sincerely,</span></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><strong style="color: rgb(0, 171, 68); background-color: transparent;">Your Name</strong></p><p><br></p>',
  },
  {
    name: "Report",
    src: "https://ssl.gstatic.com/docs/templates/thumbnails/1OLxGsoZ-q6o9MiMbWpY7FngEKzF94SS6fZXAwo-vorM_400_2.png",
    text: '<h1><span class="ql-font-serif" style="color: rgb(102, 102, 102); background-color: transparent;">COURSE NAME</span></h1><h2><strong class="ql-font-serif" style="color: rgb(0, 0, 0); background-color: transparent;">REPORT TITLE</strong></h2><h5><span class="ql-font-serif" style="color: rgb(0, 0, 0); background-color: transparent;">LOREM IPSUM DOLOR SIT AMET</span></h5><p><br></p><h6><span style="color: rgb(178, 178, 0); background-color: rgb(178, 178, 0);">――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――</span></h6><p><span class="ql-font-serif" style="color: rgb(0, 0, 0); background-color: transparent;"><img src="https://lh6.googleusercontent.com/VEgWojCJ1-FQMGl1p1shyI6jCH3mxonwL3EHQijNAp6Oq7ec5IDmkAZ1mGIubFqmZ3ybZVPM5ypBy1ZuaLUEM4EC69_qTCmcfXP0nsbrVZW4y5C6JovrhXfaKP27WJJ-hKfTeXpQPU9DjxlRbsWxEazO_nIJs4oGBVK3pccwiJogsuaP0GcE-nO5hrTNKA" height="4" width="624"></span></p><h1><span class="ql-font-serif"><img src="https://wallpapershome.com/images/wallpapers/fuji-3840x2160-4k-hd-wallpaper-japan-travel-tourism-national-10326.jpg" alt="Wallpaper fuji, 4k, HD wallpaper, japan, travel, tourism, National  Geographic Traveler Photo Contest, Nature #10326"></span></h1><h1><strong class="ql-font-serif" style="color: rgb(0, 0, 0); background-color: transparent;">Introduction</strong></h1><p><span class="ql-font-serif"> </span><span class="ql-font-serif" style="color: rgb(0, 0, 0); background-color: transparent;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.</span></p><p><br></p><h2><strong class="ql-font-serif" style="color: rgb(0, 0, 0); background-color: transparent;">Lorem ipsum</strong></h2><p><span class="ql-font-serif" style="color: rgb(0, 0, 0); background-color: transparent;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.</span></p><p><span class="ql-font-serif" style="color: rgb(0, 0, 0); background-color: transparent;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</span></p><p><br></p><h3><strong class="ql-font-serif" style="color: rgb(140, 114, 82); background-color: transparent;">Dolor sit amet</strong></h3><p><span class="ql-font-serif" style="color: rgb(0, 0, 0); background-color: transparent;">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.</span></p><p><br></p><h6><span style="color: rgb(178, 178, 0); background-color: rgb(178, 178, 0);">――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――</span></h6><p><br></p><p>1</p>',
  },
];

export default templates;
