// $(document).ready(function () {
$("form").on("submit", function (e) {
  e.preventDefault();
  // console.log($(this).serialize());
  let all_patientID = [];
  $("input.custom-p-name:checked").each(function () {
    // arrow function cannot use this.
    const patient_name = $(this).val();
    all_patientID.push(patient_name);
  });

  custom_patientIDs = JSON.stringify(all_patientID);

  const experiment_name = $("input[name='experiment-name']").val();

  if ($("input[name='adults']:checked").val()) {
    for (let i = 1; i < 10; i++) {
      console.log(all_patientID);
      all_patientID.push(`adult#00${i}`);
    }
    all_patientID.push("adult#010");
  }
  if ($("input[name='adolescents']:checked").val()) {
    for (let i = 1; i < 10; i++) {
      all_patientID.push(`adolescent#00${i}`);
    }
    all_patientID.push("adolescent#010");
  }
  if ($("input[name='children']:checked").val()) {
    for (let i = 1; i < 10; i++) {
      all_patientID.push(`child#00${i}`);
    }
    all_patientID.push("child#010");
  }

  let queried_patient_name = [];
  $.each(all_patientID, function (i, el) {
    if ($.inArray(el, queried_patient_name) === -1)
      queried_patient_name.push(el);
  });
  $.ajax({
    type: "POST",
    url: "/simulate",
    traditional: true,
    data: {
      experiment_name: experiment_name,
      sim_time: $("input[name='sim-time']").val(),
      start_hour: $("select[name='start-hour'] option:selected").val(),
      start_period: $("select[name='start-period'] option:selected").val(),
      scenario: $("input[name='scenario']:checked").val(),
      random_seed: $("input[name='random-seed']").val(),
      breakfast_time: $("select[name='breakfast-time'] option:selected").val(),
      breakfast_period: $(
        "select[name='breakfast-period'] option:selected"
      ).val(),
      breakfast_size: $("input[name='breakfast-size']").val(),
      lunch_time: $("select[name='lunch-time'] option:selected").val(),
      lunch_period: $("select[name='lunch-period'] option:selected").val(),
      lunch_size: $("input[name='lunch-size']").val(),
      dinner_time: $("select[name='dinner-time'] option:selected").val(),
      dinner_period: $("select[name='dinner-period'] option:selected").val(),
      dinner_size: $("input[name='dinner-size']").val(),
      snack_time: $("select[name='snack-time'] option:selected").val(),
      snack_period: $("select[name='snack-period'] option:selected").val(),
      snack_size: $("input[name='snack-size']").val(),
      path: $("input[name='path']:checked").val(),
      custom_path_input: $("input[name='custom-path-input']").val(),
      controller: $("input[name='controller']:checked").val(),
      adults: $("input[name='adults']:checked").val(),
      adolescents: $("input[name='adolescents']:checked").val(),
      children: $("input[name='children']:checked").val(),
      patientID: custom_patientIDs,
      animate: $("input[name='animate']:checked").val(),
      parallel: $("input[name='parallel']:checked").val(),
      sensor: $("input[name='sensor']:checked").val(),
      seed_noise: $("input[name='seed-noise']").val(),
      pump: $("input[name='pump']:checked").val(),
    },
    timeout: 100,
    //   success: function (data) {
    //     // console.log(data.experiment_name);
    //     show_chart(data);
    //   },
  });

  const options = {
    config: {
      // Vega-Lite default configuration
    },
    init: (view) => {
      // initialize tooltip handler
      view.tooltip(new vegaTooltip.Handler().call);
    },
    view: {
      // view constructor options
      // remove the loader if you don't want to default to vega-datasets!
      loader: vega.loader({
        baseURL:
          "https://unpkg.com/vega-datasets@2.2.0/build/vega-datasets.min.js",
      }),
      renderer: "svg",
    },
  };

  let config = {
    view: {
      stroke: null,
    },
    axis: {
      domain: false,
      tickColor: "lightGray",
    },
    style: {
      "guide-label": {
        fontSize: 20,
        fill: "#3e3c38",
      },
      "guide-title": {
        fontSize: 30,
        fill: "#3e3c38",
      },
    },
  };

  const show_chart = (url, config, options, fig_location, title) => {
    const create_figures = (config, options) => {
      vl.register(vega, vegaLite, options);
      // now you can use the API!
      //   const data = result.filter((d) => d.patient_id === "adolescent#001");
      const bg_cgm = vl
        .markLine({
          strokeWidth: 1,
          // stroke: "red",
        })
        //   .data(data)
        .encode(
          vl.x().fieldT("time").title(null),
          vl.y().fieldQ(vl.repeat("layer")).scale({ zero: false }),
          vl.color().datum(vl.repeat("layer")),
          vl.tooltip([vl.fieldQ("bg"), vl.hours("time")])
        )
        .width(300)
        .height(100)
        .repeat({ layer: ["bg", "cgm"] })
        .config(config);

      const cho = vl
        .markLine({ strokeWidth: 1 })
        //   .data(data)
        .encode(
          vl.x().fieldT("time").title(null),
          vl.y().fieldQ("cho").scale({ zero: false }),
          vl.tooltip([vl.fieldQ("cho"), vl.hours("time")])
        )
        .width(300)
        .height(100);

      const insulin = cho.encode(
        vl.y().fieldQ("insulin").scale({ zero: false }),
        vl.tooltip([vl.fieldQ("insulin"), vl.hours("time")])
      );
      const risk_index = vl
        .markLine({
          strokeWidth: 1,
          // stroke: "red",
        })
        .encode(
          vl.x().fieldT("time").title(null),
          vl.y().fieldQ(vl.repeat("layer")).scale({ zero: false }),
          vl.color().datum(vl.repeat("layer")),
          vl.tooltip([
            vl.fieldQ("lbgi"),
            vl.fieldQ("hbgi"),
            vl.fieldQ("risk"),
            vl.hours("time"),
          ])
        )
        .width(300)
        .height(100)
        .repeat({ layer: ["lbgi", "hbgi", "risk"] });

      fig = vl.vconcat(bg_cgm, cho, insulin, risk_index);

      // .data(data)
      // .autosize({ type: "fit", contains: "padding" })
      fig.render().then((viewElement) => {
        // render returns a promise to a DOM element containing the chart
        // viewElement.value contains the Vega View object instance
        document.getElementById("view").appendChild(viewElement);
      });
      return fig;
    };

    fig = create_figures(config, options);
    console.log(fig.title);
    var intervalId = window.setInterval(function () {
      fetch(url)
        .then((response) => {
          //   console.log("got response!");
          return response.json();
        })
        .then((result) => {
          //   console.log(result);
          fig
            .data(result)
            .title(title)
            .render()
            .then((viewElement) => {
              // render returns a promise to a DOM element containing the chart
              // viewElement.value contains the Vega View object instance
              var oldViewElement =
                document.getElementById("view").childNodes[fig_location];
              console.log(oldViewElement);
              document
                .getElementById("view")
                .replaceChild(viewElement, oldViewElement);
            });
        });
    }, 500);
  };
  console.log(queried_patient_name);
  for (let i = 0; i < queried_patient_name.length; i++) {
    let url =
      `http://127.0.0.1:5004/results/${experiment_name}/` +
      escape(queried_patient_name[i]);
    console.log(url);
    show_chart(url, config, options, i, queried_patient_name[i]);
  }
});
