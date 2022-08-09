Employee = {
  base_url: null,

  init: function() {
    this.bind_events();
    this.viewlist_podcast_category();
  },
  bind_events: function() {
    $(".add_employee").click(function() {
      $("#form").css("display", "block");
      $(".add_employee").css("display", "none");
      $(".cancel_employee").css("display", "block");
      window.scroll(500, 0);
    });
    $(".cancel_employee").click(() => {
      $("#form").css("display", "none");
      $(".add_employee").css("display", "block");
      $(".cancel_employee").css("display", "none");
      $("#_id").val(" ");
    });

    var self = this;
    $("#submit").click(function() {
      $('form[id="form"]').validate({
        rules: {
          fullName: {
            required: true,
            maxlength: 111
          },
          email: {
            required: true,
            email: true
          },
          phone: {
            required: true,
            minlength: 10,
            maxlength: 12
          }
        },
        messages: {
          fullName: {
            required: "Please Enter Your Full Name"
          },
          email: {
            required: "Please Enter Email Address",
            email: "Please Enter Vaild Email Address"
          },
          phone: {
            required: "Please Your Enter Vaild Phone Number"
          }
        },
        submitHandler: function() {
          Employee.save_employees_details();
        }
      });
    });
  },
  //-----------------------------Adding employee datails--------------------------------//
  save_employees_details: function() {
    var self = this;
    // $("#submit").prop("disabled", true);
    var newObj = new Object();
    newObj.fullName = $("#fullName").val();
    newObj.email = $("#email").val();
    newObj.phone = $("#phone").val();
    newObj._id = $("#_id").val();
    $.ajax({
      method: "POST",
      dataType: "json",
      url: self.base_url + "employee",
      data: newObj,
      success: function(data) {
        $("#fullName").val(" ");
        $("#email").val(" ");
        $("#phone").val(" ");
        swal("Form Submitted", data.message, "success").then(() => {
          Employee.viewlist_podcast_category();
          $("#form").css("display", "none");
          $(".add_employee").css("display", "block");
        });
      },
      error: function(err) {
        console.log(err);
      }
    });
  },
  //-----------------------------Deleting employee datails--------------------------------//

  delete_employee_details: function(obj) {
    var self = this;
    var row = $(obj).closest("tr");

    var rowData = $("#Datatable").dataTable().fnGetData(row);
    var detObj = new Object();
    detObj._id = rowData._id;

    $.ajax({
      method: "get",
      dataType: "json",
      url: self.base_url + "employee/delete/" + detObj._id,
      data: detObj,
      success: function(data) {
        swal({
          title: "Are you sure?",
          text:
            "Once deleted, you will not be able to recover this imaginary file!",
          icon: "warning",
          buttons: true,
          dangerMode: true
        }).then(willDelete => {
          if (willDelete) {
            swal("Poof! file has been deleted!", {
              icon: "success"
            }).then(() => {
              Employee.viewlist_podcast_category();
            });
          } else {
            swal("Employee detail  is safe!");
          }
        });
      }
    });
  },
  //-----------------------------Edit employee details--------------------------------//
  edit_subscription: function(obj) {
    window.scrollTo(500, 0);

    var row = $(obj).closest("tr");
    var id2 = $("#subscription_table1").dataTable().fnGetData(row);
    $("#subscription_id").val(id2.id);
    $("#subscription_name").val(id2.subscription_name);
    $("#subscription_business_id").val(id2.business_id);
    $("#subscription_language").val(id2.subscription_language_id);
    $("#subscription_icon_url").val(id2.subscription_dowanload_url);
    $("#subscription_description").val(id2.subscription_description);
    $("#subscription_file_path").val(id2.subscription_icon);
    $(".thumbnail-image-div").hide();
    $(".image_preview").show();
    $("#icon_preview_s").attr("src", id2.subscription_dowanload_url);
    console.log(id2.subscription_dowanload_url);
    $("#caption").val(id2.caption);

    $("#politician_type").val(id2.subscription_type);
    if (id2.subscription_type == "district") {
      $(".p_taluka").hide();
      $(".p_district").show();
      $(".p_state").show();
      $("#p_state").val(id2.state_id);

      StreamMaster.edit_viewlist_city(id2.state_id, id2.district_id);

      $("#p_taluka").val("");
    } else if (id2.subscription_type == "taluka") {
      $(".p_taluka").show();
      $(".p_district").show();
      $(".p_state").show();
      $("#p_state").val(id2.state_id);
      StreamMaster.edit_viewlist_city(id2.state_id, id2.district_id);
      StreamMaster.edit_taluka_list(id2.district_id, id2.taluka_id);
    } else {
      $(".p_taluka").hide();
      $(".p_district").hide();
      $(".p_state").hide();
    }

    if (id2.is_message_subscription == 1) {
      $("#is_status_subscription").prop("checked", true);
      $("#is_status_subscription").prop("disabled", true);
      $(".is_status").hide();
    } else {
      $("#is_status_subscription").prop("checked", false);
      $("#is_status_subscription").prop("disabled", true);
      $(".is_status").show();
    }

    if (id2.is_private == 1) {
      $("#is_private").prop("checked", true);
    } else {
      $("#is_private").prop("checked", false);
    }

    if (id2.is_horoscope == 1) {
      $("#is_horoscope").prop("checked", true);
    } else {
      $("#is_horoscope").prop("checked", false);
    }

    $("#subscription_business_id").prop("disabled", true);
    if (id2.subscription_dowanload_url != "") {
      $(".hide_img1").show();
      $(".hide_file1").hide();
      $("#show_img1").attr("src", id2.subscription_dowanload_url);
    } else {
      $(".hide_img1").hide();
      $(".hide_file1").show();
    }
    $("#welcome_message").val(id2.welcome_message);

    if (id2.subscription_tags != null) {
      var tagArray = id2.subscription_tags.split(",");
      for (var j = 0; j < tagArray.length; j++) {
        $("#form-tags-4_addTag").before(
          '<span class="tag" id="tag_id-' +
            j +
            '" onclick="deleteTag(' +
            j +
            ')"><span class="subtag" >' +
            tagArray[j] +
            '</span><a href="#"></a></span>'
        );
      }
    }

    $("#add_subscription").html("Update");
    $("#add_subscription").val("2");
  },
  edit_employee_details: function(obj) {
    var self = this;
    var row = $(obj).closest("tr");
    var rowData = $("#Datatable").dataTable().fnGetData(row);
    var editObj = new Object();
    editObj.fullName = rowData.fullName;
    editObj.email = rowData.email;
    editObj.phone = rowData.phone;
    editObj._id = rowData._id;
    // console.log(editObj._id);
    $("#form").css("display", "block");
    $("#fullName").val(editObj.fullName);
    $("#email").val(editObj.email);
    $("#phone").val(editObj.phone);
    $("#_id").val(editObj._id);
    $(".cancel_employee").css("display", "block");
    window.scroll(500, 0);

    // $(".edit-btn").click(() => {
    //   $(".edit-btn").prop("disabled", true);
    //   swal({
    //     title: "Are you sure?",
    //     text: "You won't to edit employees details.",
    //     icon: "warning",
    //     showCancelButton: true
    //   }).then(function() {
    //     var edit_id = $(".edit-btn").val();

    //     $.ajax({
    //       type: "get",
    //       contentType: "application/json; charset=utf-8",
    //       dataType: "json",
    //       url: self.base_url + "/employee/" + edit_id,
    //       success: function(data) {
    //         console.log("hello")
    //         if (data.status == true) {
    //           console.log(url)
    //           console.log(data)

    //         }
    //       }
    //     });
    //   });
    // });
  },
  //-----------------------------Get language List--------------------------------//

  // get_language_list:function() {
  //     var self = this;
  //     $.ajax({
  //         type: 'get',
  //         contentType: 'application/json; charset=utf-8',
  //         dataType: 'json',
  //         url: self.base_url + "/get_list_language",
  //         success: function(data) {
  //             var re = data;
  //             var out1 = '';
  //             for (i = 0; i < re.length; i++) {
  //                 out1 += "<option value='" + re[i].id + "'>" + re[i].language_name + "</option>";
  //             }
  //             $(".language").html(out1);
  //         }
  //     });
  // },

  //-----------------------------Save Wani----------------------------------------//

  // save_podcast:function() {
  //     var self = this;
  //     $("#submit").prop('disabled', true);
  //     var newObj = new Object()
  //     newObj.fullName = $("#FullName").val();
  //     newObj.email = $("#email").val();
  //     newObj.phone = $("#number").val();
  //     $.ajax({
  //       type: "POST",
  //       dataType: "json",
  //       url: self.base_url + "/employee",
  //       data: JSON.parse(newObj),
  //       success: function(data){
  //         swal("Form Submitted", "Click on button to add more employee", "success");

  //       }
  //     })

  //     if (priority == 0) {
  //         var upObj = new Object();
  //         upObj.pod_id = $("#pod_id").val();
  //         upObj._token = $('meta[name="csrf-token"]').attr("content");
  //         $.ajax({
  //             type: 'POST',
  //             contentType: 'application/json; charset=utf-8',
  //             dataType: 'json',
  //             url: self.base_url + "/add_podcast_category",
  //             data: JSON.stringify(upObj),
  //             success: function(data) {
  //                 $("#save_podcast").prop('disabled', false);
  //                 $("#pod_id").val('');
  //                 $("#podcast_language").val('1');
  //                 if (data.status == true) {
  //                     $("#podcast_category_name").val('');
  //                     $("#priority").val('');
  //                     $("#podcast_img").val("");
  //                     $("#progressBar_c").hide();
  //                     $("input[name='layout']").prop("checked",false);
  //                     $("#save_podcast").html("create");
  //                     $(".show_img_podcast").show();
  //                     $(".hide_img_podcast").hide();
  //                     $("#podcast_category_thumbnail").val('');
  //                     $("#podcastget_status").hide();
  //                     $("#wani_url").val("");
  //                     $(".image_preview").hide();
  //                     swal("Success!", data.message, "success");
  //                 } else {
  //                     $("#podcast_category_name").val('');
  //                     $("#priority").val('');
  //                     swal("Error!", data.message, "warning");
  //                 }
  //                 $("#save_podcast").html("Create");
  //                 $("#save_podcast").val("1");
  //                 $("#awas_cat").val("");
  //                 Employee.viewlist_podcast_category();
  //             }
  //         });
  //     } else {
  //         swal("Error!", 'Change Priority it\'s already exits.', "warning");

  //     }

  // },

  //-----------------------------View wani List-----------------------------------//

  viewlist_podcast_category: function() {
    var self = this;

    $.ajax({
      method: "get",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      url: self.base_url + "employee/employeesList",
      success: function(data) {
        // console.log(data)
        $("#Datatable").DataTable({
          data: data.data,

          lengthMenu: [[25, 50, 75, -1], [25, 50, 75, "All"]],
          destroy: true,
          bSort: false,
          columns: [
            {
              data: "_id",
              visible: false
            },
            {
              data: "fullName",
              sTitle: "Full name"
            },
            {
              data: "email",
              sTitle: "Email"
            },
            {
              data: "phone",
              sTitle: "Phone Number"
            },
            {
              data: "null",
              width: "10%",
              sTitle: "Action",
              render: function(data, type, row) {
                // return
                // '<a href="javascript:void(0)" onclick="layout.edit_user(this)" class="text-inverse edit increase_tool  p-r-10" data-toggle="tooltip" title="" data-original-title="Edit"><i class="la la-edit font-26"></i></a>
                return (
                  '<a href="javascript:void(0)" style="" onclick="Employee.edit_employee_details(this)" data-id="' +
                  row._id +
                  '" class="text-primary" data-toggle="tooltip" title="" data-original-title="Edit"><i class="fas fa-edit" style="font-size:20px"></i></a>' +
                  "&nbsp|&nbsp" +
                  '<a href="javascript:void(0)" style="" onclick="Employee.delete_employee_details(this)" data-id="' +
                  row._id +
                  '" class="text-inverse trash increase_tool" data-toggle="tooltip" title="" data-original-title="Delete"><i class="fas fa-trash-alt" style="font-size:20px;"></i></a>'
                );
              }
            }
          ]
        });
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

  //-----------------------------change Deactivate Status-------------------------//

  // change_status_deactive_wani:function(id) {
  //     var self = this;
  //     swal({
  //         title: 'Are you sure?',
  //         text: "You won't to deactive this Wani category!",
  //         type: 'warning',
  //         showCancelButton: true,
  //         confirmButtonClass: 'btn btn-success',
  //         cancelButtonClass: 'btn btn-danger m-l-10',
  //         confirmButtonText: 'Yes, change it!'
  //     }).then(function() {
  //         $.ajax({
  //             type: "get",
  //             contentType: "application/json; charset=utf-8'",
  //             dataType: "JSON",
  //             data: {
  //                 id: id
  //             },
  //             url: self.base_url + "/change_status_wani_category_deactive",
  //             success: function(responce) {
  //                 toastr[responce.text](responce.message, responce.title);

  //                 Employee.viewlist_podcast_category();
  //             }
  //         });
  //     });

  // },

  //-----------------------------Change activate status---------------------------//

  // change_status_active_wani:function(id) {
  //     var self = this;
  //     swal({
  //         title: 'Are you sure?',
  //         text: "You won't to active this Wani category!",
  //         type: 'warning',
  //         showCancelButton: true,
  //         confirmButtonClass: 'btn btn-success',
  //         cancelButtonClass: 'btn btn-danger m-l-10',
  //         confirmButtonText: 'Yes, change it!'
  //     }).then(function() {
  //         $.ajax({
  //             type: "get",
  //             contentType: "application/json; charset=utf-8'",
  //             dataType: "JSON",
  //             data: {
  //                 id: id
  //             },
  //             url: self.base_url + "/change_status_wani_category_active",
  //             success: function(responce) {
  //                 toastr[responce.text](responce.message, responce.title);

  //                 Employee.viewlist_podcast_category();
  //             }
  //         });
  //     });

  // },

  //------------------------------Edit wani---------------------------------------//

  // edit_pod_category:function(obj) {
  //     var row = $(obj).closest('tr');
  //     var id2 = $('#viewlist_podcast_category').dataTable().fnGetData(row);
  //     $("#pod_id").val(id2.id);
  //     $("#podcast_category_name").val(id2.podcast_category_name);
  //     $("#podcast_img").val(id2.icon_image);
  //     $("#podcast_language").val(id2.podcast_language);
  //     $("#awas_cat").val(id2.awas_cat_id);
  //     $("#wani_url").val(id2.url);
  //     $(".show_img_podcast").hide();
  //     $(".hide_img_podcast").show();
  //     $("#img_podcast").attr("src", id2.icon_image);
  //     $("#priority").val(id2.priority);
  //     $("input[name=layout][value=" + id2.layout + "]").prop('checked', true);
  //     $("#save_podcast").html("Update");

  // },

  //-----------------------------Delete wani-------------------------------------//

  //  deletepod_category:function(id) {
  //      var self = this;
  //     swal({
  //         title: 'Are you sure?',
  //         text: "You won't to delete podcast category all data.",
  //         type: 'warning',
  //         showCancelButton: true,
  //         confirmButtonClass: 'btn btn-success',
  //         cancelButtonClass: 'btn btn-danger m-l-10',
  //         confirmButtonText: 'Yes, delete it!'
  //     }).then(function() {
  //         $.ajax({
  //             type: 'get',
  //             contentType: 'application/json; charset=utf-8',
  //             dataType: 'json',
  //             data: {
  //                 id: id
  //             },
  //             url: self.base_url + "/deletepod_category",
  //             success: function(data) {
  //                 if (data.status == true) {
  //                     swal(
  //                         'Deleted!',
  //                         'data has been deleted.',
  //                         'success'
  //                     )
  //                     Employee.viewlist_podcast_category();
  //                 } else {
  //                     swal('Error!',
  //                         'Something get wrong!.',
  //                         'error');
  //                 }
  //                 Employee.viewlist_podcast_category();
  //             }
  //         });
  //     })
  // },

  //-----------------------------Upload Image------------------------------------//
};
