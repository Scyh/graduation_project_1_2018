(function ($) {
    $.fn.solarlunar = function (opts) {
        var option = $.extend({}, $.fn.solarlunar.default, opts);
        var minyear = option.minyear < 1892 ? 1892 : option.minyear;   
        var maxyear = option.maxyear > 2100 ? 2100 : option.maxyear;


        var html = '<div id="calendar" style="display:none;position:absolute;z-index:100;background: #eee;"><input type="radio" name="calendar" value="1">公历<input type="radio" name="calendar" value="2">农历<div id="slct"><span id="solar"><select name="year" id="year" class="select-down"></select><select name="month" id="month" class="select-down"><option value="1">1月</option><option value="2">2月</option><option value="3">3月</option><option value="4">4月</option><option value="5">5月</option><option value="6">6月</option><option value="7">7月</option><option value="8">8月</option><option value="9">9月</option><option value="10">10月</option><option value="11">11月</option><option value="12">12月</option></select><select name="day" id="day" class="select-down"></select></span><span id="lunar"><select name="lyear" id="lyear" class="select-down"></select><select name="lmonth" id="lmonth" class="select-down"></select><select name="lday" id="lday" class="select-down"></select></span></div></div>';

        $(this).after(html);


        if (option.type === 'solar') {
            $("input[name=calendar]:eq(0)").prop("checked", true);
            $("#solar").show();
            $("#lunar").hide();

        } else {
            $("input[name=calendar]:eq(1)").prop("checked", true);
            $("#lunar").show();
            $("#solar").hide();
        }

        var year = [];

        for (var i = minyear, j = 0; i <= maxyear; i++, j++) {   
            year[j] = i;
        }
        year.reverse();
        $.each(year, function (index, value) {  
            $("#year").append('<option value="' + value + '">' + value + '</option>');
        });

        var myDate = new Date();
        myDate.setFullYear(option.year, option.month, 0);
        var lastDay = myDate.getDate();
        for (var i = 1; i <= lastDay; i++) {  
            $("#day").append('<option value="' + i + '">' + i + '日</option>');
        }

     
        $("#year").val(option.year);
        $("#month").val(option.month);
        $("#day").val(option.day);


      
        $.each(year, function (index, value) {  
            $("#lyear").append('<option value="' + value + '">' + value + '</option>');
        });

        
        var lm = lunarMonth(option.lyear); 
        $.each(lm, function (index, value) {  
            $("#lmonth").append('<option value="' + (index + 1) + '">' + value + '</option>');
        });

        var ld = lunarLastDay(2017, 7);

        $.each(ld, function (index, value) {  
            $("#lday").append('<option value="' + (index + 1) + '">' + value + '</option>');
        });



        $("#lyear").val(option.lyear);
        $("#lmonth").val(option.lmonth);
        $("#lday").val(option.lday);

 
        if (option.type === 'solar') {
            $("input[name=calendar]:eq(0)").prop("checked", true);
            $("#solar").show();
            $("#lunar").hide();

        } else {
            $("input[name=calendar]:eq(1)").prop("checked", true);
            $("#lunar").show();
            $("#solar").hide();
        }

        if (option.type === 'solar') {
            var nian = $("#year").find("option:selected").text() + '年';
            var yue = $("#month").find("option:selected").text();
            var ri = $("#day").find("option:selected").text();

            $(this).val(nian + yue + ri);
        } else {
            var nian = $("#lyear").find("option:selected").text() + '年';
            var yue = $("#lmonth").find("option:selected").text();
            var ri = $("#lday").find("option:selected").text();

            $(this).val(nian + yue + ri);
        }


        var obj = $(this);


        obj.on("click", function (e) {
            e.stopPropagation();
            $("#calendar").toggle();
        });
 
        $('body').on('click', function () {
            $("#calendar").hide();
        })
        $("#calendar").on('click', function (e) {
            e.stopPropagation();
        })


        $("input[name=calendar]").on("click", obj, function () {
            if ($("input[name='calendar']:checked").val() === '1') {
                $("#solar").show();
                $("#lunar").hide();
                var nian = $("#year").find("option:selected").text() + '年';
                var yue = $("#month").find("option:selected").text();
                var ri = $("#day").find("option:selected").text();
                obj.val(nian + yue + ri);
            } else {
                $("#lunar").show();
                $("#solar").hide();
                var nian = $("#lyear").find("option:selected").text() + '年';
                var yue = $("#lmonth").find("option:selected").text();
                var ri = $("#lday").find("option:selected").text();
                obj.val(nian + yue + ri);
            }
        });

        $("#year,#month").on("change", obj, function (event) {

            var y = $("#year").val();
            var m = $("#month").val();
            var d = $("#day").val();

            var myDate = new Date();
            myDate.setFullYear(y, m, 0);
            var lastDay = myDate.getDate();

            var $day_length = $("#day option").length;  
            if (lastDay > $day_length) {    
                for ($i = $day_length; $i < lastDay; $i++) {
                    $("#day").append('<option value="' + ($i + 1) + '">' + ($i + 1) + '日</option>');
                }

            } else if (lastDay < $day_length) {   //灏戜簬鐜版湁灏辨埅鍙�
                document.getElementById("day").length = lastDay;
            }

            if (option.linkage && event.originalEvent) {  //濡傛灉閰嶇疆浜嗚鑱斿姩锛岃繖閲岃鎶婂啘鍘嗚缃竴涓嬨€備笖鏄敤鎴锋敼鍙樼殑锛岄潪绋嬪簭鏀瑰彉鐨勶紙涓嶇劧姝诲惊鐜簡锛�
                var lunars = solarToLunar(y, m, d);
                //骞达紝骞舵墜鍔ㄨЕ鍙戝勾鐨刢hange浜嬩欢
                $("#lyear").val(lunars[0]);
                $("#lyear").trigger("change");

                //鏈堬紝骞舵墜鍔ㄨЕ鍙戞湀鐨刢hange浜嬩欢
                $("#lmonth").val(lunars[1]);
                $("#lmonth").trigger("change");

                $("#lday").val(lunars[2]);
            }

            //鏀瑰彉input鐨勫€�
            var nian = $("#year").find("option:selected").text() + '年';
            var yue = $("#month").find("option:selected").text();
            var ri = $("#day").find("option:selected").text();
            obj.val(nian + yue + ri);
        });
        //3.鍏巻鏃ユ敼鍙樻椂
        $("#day").on("change", obj, function (event) {
            if (option.linkage && event.originalEvent) {  //濡傛灉閰嶇疆浜嗚鑱斿姩锛屼笖鏄笅鎷夋鐢ㄦ埛鏀瑰彉鐨勶紝鍒欎慨鏀瑰啘鍘嗐€�
                var y = $("#year").val();
                var m = $("#month").val();
                var d = $("#day").val();

                var lunars = solarToLunar(y, m, d);
                //骞达紝骞舵墜鍔ㄨЕ鍙戝勾鐨刢hange浜嬩欢
                $("#lyear").val(lunars[0]);
                $("#lyear").trigger("change");

                //鏈堬紝骞舵墜鍔ㄨЕ鍙戞湀鐨刢hange浜嬩欢銆�
                $("#lmonth").val(lunars[1]);
                $("#lmonth").trigger("change");

                $("#lday").val(lunars[2]);
            }
            //鏀瑰彉input鐨勫€�
            var nian = $("#year").find("option:selected").text() + '年';
            var yue = $("#month").find("option:selected").text();
            var ri = $("#day").find("option:selected").text();
            obj.val(nian + yue + ri);
        });

        //1.鍐滃巻骞存敼鍙樻椂
        $("#lyear").on("change", obj, function (event) {

            //鍐滃巻鏈堝鏋滄棫鐨勬槸13鏈堬紝鎴栨柊鐨勬槸13鏈堬紝閮借閲嶆柊鍔犺浇銆傦紙鏃х殑鍜屾柊鐨勯兘鏄�12鏈堢殑涓嶅彉銆傝繖鏄负浜嗗皯鍙樻崲鐢ㄦ埛閫変腑鐨勶級
            var $lmonth_length = $("#lmonth option").length;    //鍐滃巻涓幇鏈夋湀涓暟
            var $lm = lunarMonth($("#lyear").val());          //浼犲叆骞翠腑鏈堝垪琛�
            // var $lmText = $("#lmonth").find("option:selected").text();

            if ($lmonth_length == 13 || $lm.length == 13) {
                $("#lmonth").empty();
                $.each($lm, function (index, value) {  //鍔犲埌骞寸殑涓嬫媺鍒楄〃涓�
                    $("#lmonth").append('<option value="' + (index + 1) + '">' + value + '</option>');
                });

                // $("#lmonth").find("option[text='浜屾湀']").attr("selected",true);  //灏嗕箣鍓嶉€変腑鐨勬湀閫変腑
            }

            //姣忔湀鏄�29澶╄繕鏄�30澶�
            var $lday_length = $("#lday option").length;    //鍐滃巻涓師鏈夊ぉ涓暟
            var isSanshi = lunarIsSanshi($("#lyear").val(), $("#lmonth").val()); //鐜版湁澶╂暟

            if (isSanshi === '1') {
                if ($lday_length == 29) {
                    $("#lday").append('<option value="' + 30 + '">月</option>');
                }
            } else {
                if ($lday_length == 30) {
                    $("#lday option[value='30']").remove();
                }
            }

            if (option.linkage && event.originalEvent) {  //濡傛灉閰嶇疆浜嗚鑱斿姩锛屼笖涓轰笅鎷夋槸鐢ㄦ埛鏀瑰彉鐨勶紝杩欓噷瑕佹妸鍏巻璁剧疆涓€涓�
                var ly = $("#lyear").val();
                var lm = $("#lmonth").val();
                var ld = $("#lday").val();
                var solars = lunarToSolar(ly, lm, ld);

                //骞�
                $("#year").val(solars[0]);

                //鏈堬紝骞舵墜鍔ㄨЕ鍙戝勾鏈堢殑change浜嬩欢銆�
                $("#month").val(solars[1]);
                $("#month").trigger("change");

                $("#day").val(solars[2]);
            }
            //鏀瑰彉input鐨勫€�
            var nian = $("#lyear").find("option:selected").text() + '年';
            var yue = $("#lmonth").find("option:selected").text();
            var ri = $("#lday").find("option:selected").text();
            obj.val(nian + yue + ri);

        });
        //2.鍐滃巻鏈堟敼鍙樻椂
        $("#lmonth").on("change", obj, function (event) {
            var $lday_length = $("#lday option").length;    //鍐滃巻涓師鏈夊ぉ涓暟
            var isSanshi = lunarIsSanshi($("#lyear").val(), $("#lmonth").val()); //鐜版湁澶╂暟

            if (isSanshi === '1') {
                if ($lday_length == 29) {
                    $("#lday").append('<option value="' + 30 + '">月</option>');
                }
            } else {
                if ($lday_length == 30) {
                    $("#lday option[value='30']").remove();
                }
            }

            if (option.linkage && event.originalEvent) {  //濡傛灉閰嶇疆浜嗚鑱斿姩锛屼笖涓轰笅鎷夋槸鐢ㄦ埛鏀瑰彉鐨勶紝杩欓噷瑕佹妸鍏巻璁剧疆涓€涓�
                var ly = $("#lyear").val();
                var lm = $("#lmonth").val();
                var ld = $("#lday").val();
                var solars = lunarToSolar(ly, lm, ld);

                //骞�
                $("#year").val(solars[0]);

                //鏈堬紝骞舵墜鍔ㄨЕ鍙戝勾鏈堢殑change浜嬩欢銆�
                $("#month").val(solars[1]);
                $("#month").trigger("change");

                $("#day").val(solars[2]);
            }
            //鏀瑰彉input鐨勫€�
            var nian = $("#lyear").find("option:selected").text() + '年';
            var yue = $("#lmonth").find("option:selected").text();
            var ri = $("#lday").find("option:selected").text();
            obj.val(nian + yue + ri);
        });

        //3.鍐滃巻鏃ユ敼鍙樻椂
        $("#lday").on("change", obj, function (event) {

            if (option.linkage && event.originalEvent) {  //濡傛灉閰嶇疆浜嗚鑱斿姩锛屼笖涓轰笅鎷夋槸鐢ㄦ埛鏀瑰彉鐨勶紝杩欓噷瑕佹妸鍏巻璁剧疆涓€涓�

                var ly = $("#lyear").val();
                var lm = $("#lmonth").val();
                var ld = $("#lday").val();
                var solars = lunarToSolar(ly, lm, ld);

                //骞�
                $("#year").val(solars[0]);

                //鏈堬紝骞舵墜鍔ㄨЕ鍙戝勾鏈堢殑change浜嬩欢銆�
                $("#month").val(solars[1]);
                $("#month").trigger("change");

                $("#day").val(solars[2]);

            }
            //鏀瑰彉input鐨勫€�
            var nian = $("#lyear").find("option:selected").text() + '年';
            var yue = $("#lmonth").find("option:selected").text();
            var ri = $("#lday").find("option:selected").text();
            obj.val(nian + yue + ri);
        });

    }

    //****4.榛樿鍙傛暟****
    $.fn.solarlunar.default = {
        linkage: true,  //鏄惁鍦ㄩ€夊叕鍘嗭紙鍐滃巻锛夋椂锛屽啘鍘嗭紙鍏巻锛夎仈鍔ㄥ彉鍖栥€�
        minyear: 1950,
        maxyear: 2035,
        type: "lunar",
        year: 2018,
        month: 1,
        day: 1,
        lyear: 2017,
        lmonth: 12,
        lday: 15
    };

    
    $.lunarInfo = {
        1891: [0, 2, 9, 21936],
        1892: [6, 1, 30, 9656],
        1893: [0, 2, 17, 9584],
        1894: [0, 2, 6, 21168],
        1895: [5, 1, 26, 43344],
        1896: [0, 2, 13, 59728],
        1897: [0, 2, 2, 27296],
        1898: [3, 1, 22, 44368],
        1899: [0, 2, 10, 43856],
        1900: [8, 1, 30, 19304],
        1901: [0, 2, 19, 19168],
        1902: [0, 2, 8, 42352],
        1903: [5, 1, 29, 21096],
        1904: [0, 2, 16, 53856],
        1905: [0, 2, 4, 55632],
        1906: [4, 1, 25, 27304],
        1907: [0, 2, 13, 22176],
        1908: [0, 2, 2, 39632],
        1909: [2, 1, 22, 19176],
        1910: [0, 2, 10, 19168],
        1911: [6, 1, 30, 42200],
        1912: [0, 2, 18, 42192],
        1913: [0, 2, 6, 53840],
        1914: [5, 1, 26, 54568],
        1915: [0, 2, 14, 46400],
        1916: [0, 2, 3, 54944],
        1917: [2, 1, 23, 38608],
        1918: [0, 2, 11, 38320],
        1919: [7, 2, 1, 18872],
        1920: [0, 2, 20, 18800],
        1921: [0, 2, 8, 42160],
        1922: [5, 1, 28, 45656],
        1923: [0, 2, 16, 27216],
        1924: [0, 2, 5, 27968],
        1925: [4, 1, 24, 44456],
        1926: [0, 2, 13, 11104],
        1927: [0, 2, 2, 38256],
        1928: [2, 1, 23, 18808],
        1929: [0, 2, 10, 18800],
        1930: [6, 1, 30, 25776],
        1931: [0, 2, 17, 54432],
        1932: [0, 2, 6, 59984],
        1933: [5, 1, 26, 27976],
        1934: [0, 2, 14, 23248],
        1935: [0, 2, 4, 11104],
        1936: [3, 1, 24, 37744],
        1937: [0, 2, 11, 37600],
        1938: [7, 1, 31, 51560],
        1939: [0, 2, 19, 51536],
        1940: [0, 2, 8, 54432],
        1941: [6, 1, 27, 55888],
        1942: [0, 2, 15, 46416],
        1943: [0, 2, 5, 22176],
        1944: [4, 1, 25, 43736],
        1945: [0, 2, 13, 9680],
        1946: [0, 2, 2, 37584],
        1947: [2, 1, 22, 51544],
        1948: [0, 2, 10, 43344],
        1949: [7, 1, 29, 46248],
        1950: [0, 2, 17, 27808],
        1951: [0, 2, 6, 46416],
        1952: [5, 1, 27, 21928],
        1953: [0, 2, 14, 19872],
        1954: [0, 2, 3, 42416],
        1955: [3, 1, 24, 21176],
        1956: [0, 2, 12, 21168],
        1957: [8, 1, 31, 43344],
        1958: [0, 2, 18, 59728],
        1959: [0, 2, 8, 27296],
        1960: [6, 1, 28, 44368],
        1961: [0, 2, 15, 43856],
        1962: [0, 2, 5, 19296],
        1963: [4, 1, 25, 42352],
        1964: [0, 2, 13, 42352],
        1965: [0, 2, 2, 21088],
        1966: [3, 1, 21, 59696],
        1967: [0, 2, 9, 55632],
        1968: [7, 1, 30, 23208],
        1969: [0, 2, 17, 22176],
        1970: [0, 2, 6, 38608],
        1971: [5, 1, 27, 19176],
        1972: [0, 2, 15, 19152],
        1973: [0, 2, 3, 42192],
        1974: [4, 1, 23, 53864],
        1975: [0, 2, 11, 53840],
        1976: [8, 1, 31, 54568],
        1977: [0, 2, 18, 46400],
        1978: [0, 2, 7, 46752],
        1979: [6, 1, 28, 38608],
        1980: [0, 2, 16, 38320],
        1981: [0, 2, 5, 18864],
        1982: [4, 1, 25, 42168],
        1983: [0, 2, 13, 42160],
        1984: [10, 2, 2, 45656],
        1985: [0, 2, 20, 27216],
        1986: [0, 2, 9, 27968],
        1987: [6, 1, 29, 44448],
        1988: [0, 2, 17, 43872],
        1989: [0, 2, 6, 38256],
        1990: [5, 1, 27, 18808],
        1991: [0, 2, 15, 18800],
        1992: [0, 2, 4, 25776],
        1993: [3, 1, 23, 27216],
        1994: [0, 2, 10, 59984],
        1995: [8, 1, 31, 27432],
        1996: [0, 2, 19, 23232],
        1997: [0, 2, 7, 43872],
        1998: [5, 1, 28, 37736],
        1999: [0, 2, 16, 37600],
        2000: [0, 2, 5, 51552],
        2001: [4, 1, 24, 54440],
        2002: [0, 2, 12, 54432],
        2003: [0, 2, 1, 55888],
        2004: [2, 1, 22, 23208],
        2005: [0, 2, 9, 22176],
        2006: [7, 1, 29, 43736],
        2007: [0, 2, 18, 9680],
        2008: [0, 2, 7, 37584],
        2009: [5, 1, 26, 51544],
        2010: [0, 2, 14, 43344],
        2011: [0, 2, 3, 46240],
        2012: [4, 1, 23, 46416],
        2013: [0, 2, 10, 44368],
        2014: [9, 1, 31, 21928],
        2015: [0, 2, 19, 19360],
        2016: [0, 2, 8, 42416],
        2017: [6, 1, 28, 21176],
        2018: [0, 2, 16, 21168],
        2019: [0, 2, 5, 43312],
        2020: [4, 1, 25, 29864],
        2021: [0, 2, 12, 27296],
        2022: [0, 2, 1, 44368],
        2023: [2, 1, 22, 19880],
        2024: [0, 2, 10, 19296],
        2025: [6, 1, 29, 42352],
        2026: [0, 2, 17, 42208],
        2027: [0, 2, 6, 53856],
        2028: [5, 1, 26, 59696],
        2029: [0, 2, 13, 54576],
        2030: [0, 2, 3, 23200],
        2031: [3, 1, 23, 27472],
        2032: [0, 2, 11, 38608],
        2033: [11, 1, 31, 19176],
        2034: [0, 2, 19, 19152],
        2035: [0, 2, 8, 42192],
        2036: [6, 1, 28, 53848],
        2037: [0, 2, 15, 53840],
        2038: [0, 2, 4, 54560],
        2039: [5, 1, 24, 55968],
        2040: [0, 2, 12, 46496],
        2041: [0, 2, 1, 22224],
        2042: [2, 1, 22, 19160],
        2043: [0, 2, 10, 18864],
        2044: [7, 1, 30, 42168],
        2045: [0, 2, 17, 42160],
        2046: [0, 2, 6, 43600],
        2047: [5, 1, 26, 46376],
        2048: [0, 2, 14, 27936],
        2049: [0, 2, 2, 44448],
        2050: [3, 1, 23, 21936],
        2051: [0, 2, 11, 37744],
        2052: [8, 2, 1, 18808],
        2053: [0, 2, 19, 18800],
        2054: [0, 2, 8, 25776],
        2055: [6, 1, 28, 27216],
        2056: [0, 2, 15, 59984],
        2057: [0, 2, 4, 27424],
        2058: [4, 1, 24, 43872],
        2059: [0, 2, 12, 43744],
        2060: [0, 2, 2, 37600],
        2061: [3, 1, 21, 51568],
        2062: [0, 2, 9, 51552],
        2063: [7, 1, 29, 54440],
        2064: [0, 2, 17, 54432],
        2065: [0, 2, 5, 55888],
        2066: [5, 1, 26, 23208],
        2067: [0, 2, 14, 22176],
        2068: [0, 2, 3, 42704],
        2069: [4, 1, 23, 21224],
        2070: [0, 2, 11, 21200],
        2071: [8, 1, 31, 43352],
        2072: [0, 2, 19, 43344],
        2073: [0, 2, 7, 46240],
        2074: [6, 1, 27, 46416],
        2075: [0, 2, 15, 44368],
        2076: [0, 2, 5, 21920],
        2077: [4, 1, 24, 42448],
        2078: [0, 2, 12, 42416],
        2079: [0, 2, 2, 21168],
        2080: [3, 1, 22, 43320],
        2081: [0, 2, 9, 26928],
        2082: [7, 1, 29, 29336],
        2083: [0, 2, 17, 27296],
        2084: [0, 2, 6, 44368],
        2085: [5, 1, 26, 19880],
        2086: [0, 2, 14, 19296],
        2087: [0, 2, 3, 42352],
        2088: [4, 1, 24, 21104],
        2089: [0, 2, 10, 53856],
        2090: [8, 1, 30, 59696],
        2091: [0, 2, 18, 54560],
        2092: [0, 2, 7, 55968],
        2093: [6, 1, 27, 27472],
        2094: [0, 2, 15, 22224],
        2095: [0, 2, 5, 19168],
        2096: [4, 1, 25, 42216],
        2097: [0, 2, 12, 42192],
        2098: [0, 2, 1, 53584],
        2099: [2, 1, 21, 55592],
        2100: [0, 2, 9, 54560]
    }

    //****5.涓€浜涚鏈夋柟娉曞嚱鏁�****
    //灏嗗啘鍘嗙殑鏁村勾鐨勬湀浠斤紝杞寲鎴愭眽瀛�
    function lunarMonth(ly) {
        var lm = [
            '正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'
        ];
        var run = [
            '二月', '二月', '二月', '二月', '二月', '二月', '二月', '二月', '二月', '二月', '二月', '二月'
        ];
        ly = ly < 1891 ? 1891 : (ly > 2100 ? 2100 : ly);
        var mth = $.lunarInfo[ly];
        if (mth[0] > 0) {
            lm.splice(mth[0], 0, run[mth[0] - 1]);
        }
        return lm;
    }

    //璁＄畻鍐滃巻褰撴湀鐨勫ぉ銆傝繑鍥炲瓧绗︿覆鐨�0鎴�1.0涓烘棤30,1涓烘湁30
     function lunarIsSanshi(ly, lm) {
        ly = ly < 1891 ? 1891 : (ly > 2100 ? 2100 : ly);
        var mth = $.lunarInfo[ly];
        var tianshu = (mth[3]).toString(2);
        //瑕佹坊澶�16浣�
        var shiliu = ('00000' + tianshu).slice(-16);
        return shiliu.substr(lm - 1, 1);
    }


    //璁＄畻鍐滃巻褰撴湀鐨勫ぉ銆傛湁29澶╀笌30涔嬪垎 銆傝繑鍥炴眽瀛椼€�(濡傛灉褰撳勾鏈夐棸鏈堟椂锛岄棸鏈堝悗鐨勬湀浠介兘瑕佸姞涓€銆�)
    function lunarLastDay(ly, lm) {
        var dayue = [
            '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
            '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
            '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十',
        ];
        var xiaoyue = [
             '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
            '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
            '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九'
        ];

        var is_dayue = lunarIsSanshi(ly, lm);

        if (is_dayue === '1') {
            return dayue;
        } else {
            return xiaoyue;
        }
    }

    //灏嗗叕鍘嗚浆鎴愬啘鍘�,杩斿洖[ly,lm,ld]
     function solarToLunar(y, m, d) {
        //鍙栧緱褰撳勾鐨刬nfo
        var mth = $.lunarInfo[y];

        //绠楁槬鑺傝窛鍏冩棪鐨勫ぉ鏁�
        var chunjie = solarDays(y, mth[1], mth[2]);
        //杩欏ぉ璺濆厓鏃︾殑澶╂暟
        var zhetian = solarDays(y, m, d);
        //涓や釜澶╂暟鐩稿噺锛堜袱绉嶆儏鍐碉細姝ｆ暟锛岃礋鏁帮級
        var zf = zhetian - chunjie;

        var ly = y;
        var lm = 0;
        var ld = 0;

        if (zf >= 0) {//姝ｆ暟鎯呭喌锛屾牴鎹瘡鏈堟湁鏃�29澶╋紝鍙畻鐨勮繖涓€澶╂槸鍐滃巻鐨勫嚑鏈堝垵鍑犮€�
            var tianshu = (mth[3]).toString(2);
            //瑕佹坊澶�16浣�
            var shiliu = ('00000' + tianshu).slice(-16);
            var num = 0;
            var jitian = 0;

            for (var i = 0; i < shiliu.length; i++) {
                if (shiliu.substr(i, 1) === '1') {
                    num += 30;
                    jitian = 30;
                } else {
                    num += 29;
                    jitian = 29;
                }

                if (zf < num) {
                    lm = i + 1;
                    ld = zf - num + jitian + 1;
                    break;
                }
            }

        } else {

            var mthLast = $.lunarInfo[y - 1];
  
            var chunjie = solarDays(y - 1, mthLast[1], mthLast[2]);

            var qunian = solarDays(y - 1, 12, 31);
            var zf = zhetian + qunian - chunjie + 1;

            var tianshu = (mthLast[3]).toString(2);

            var shiliu = ('00000' + tianshu).slice(-16);
            var num = 0;
            var jitian = 0;
            for (var i = 0; i < shiliu.length; i++) {
                if (shiliu.substr(i, 1) === '1') {
                    num += 30;
                    jitian = 30;
                } else {
                    num += 29;
                    jitian = 29;
                }

                if (zf < num) {
                    ly = y - 1;
                    lm = i + 1;
                    ld = zf - num + jitian + 1;
                    break;
                }
            }
        }

        return [ly, lm, ld];
    }


     function lunarToSolar(ly, lm, ld) {
 
        var chunjie = lunarDays(ly, lm, ld);
  
        var mth = $.lunarInfo[ly];
        var yuandan = solarDays(ly, mth[1], mth[2]);

       
        var addNum = chunjie + yuandan;


        var ydDay = new Date(ly + '/1/1').getTime();


        var thatDay = new Date(ydDay + addNum * (24 * 60 * 60 * 1000));
        var y = thatDay.getFullYear();
        var m = thatDay.getMonth() + 1;
        var d = thatDay.getDate();

        return [y, m, d];
    }

     function solarDays(y, m, d) {
        return (new Date(y + '/' + m + '/' + d) - new Date(y + '/1/1')) / 1000 / 60 / 60 / 24;
    }


     function lunarDays(ly, lm, ld) {

        var mth = $.lunarInfo[ly];
        var tianshu = (mth[3]).toString(2);

        var shiliu = ('00000' + tianshu).slice(-16);
        var num = parseInt(ld) - 1;
        for (var i = 0; i < lm - 1; i++) {
            if (shiliu.charAt(i) === '1') {
                num += 30;
            } else {
                num += 29;
            }
        }
        return num;
    }

})(jQuery);