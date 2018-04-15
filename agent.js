// get instance of internal javascript api
var oa = new OA();

// get agent list


 $(document).on("click", ".city-radio", function() {
     $(this).prop('checked',true);
});

 $(document).on("click", ".find-agents", function() {
     $('.agent-result').empty();
     if($('#sydney').is(':checked')){
        oa.agent.getAgentsByCoordinates('-33.8688', '151.2093').then(function(results) {
        sydneyAgents=results;
        console.log(results); // agent list to display
        $('.city-name').html('Sydney');
        addAgents(sydneyAgents,'.agent-result');
        });
    }
    if($('#melbourne').is(':checked')){
        oa.agent.getAgentsByCoordinates('-37.8136', '144.9631').then(function(results) {
            melbournAgents=results;
            console.log(melbournAgents); // agent list to display
            $('.city-name').html('Melbourne');
            addAgents(melbournAgents,'.agent-result');
        });
    }
    if($('#brisbane').is(':checked')){
        oa.agent.getAgentsByCoordinates('-37.8136', '144.9631').then(function(results) {
            brisbaneAgents=results;
            console.log(brisbaneAgents); // agent list to display
            $('.city-name').html('Brisbane');
            addAgents(brisbaneAgents,'.agent-result');
        });
    }
});

$(document).on("click", ".update-agent", function() {
    agentid = $(this).attr('agent-id');
    name=$(this).siblings('.agent-name-box').val();
    console.log(agentid+' '+name);

    oa.agent.updateAgent(agentid,name);
  });


  $(document).on("click", ".search-btn", function() {
      $('.search-result').empty();
    name=$(this).siblings('input').val();
    console.log(name);

    $.ajax({
          url: "/search-by-name/" + name,
          type: "get",

          dataType: "json"
      }).done(function(results) {
            addAgents(results,'.search-result');
    });
  });

function addAgents(results,classname){
    for(var i=0;i<20;i++){
            agentid= results.data[i].id;
            name = results.data[i].name;
            agency= results.data[i].agencyname;
            email= results.data[i].email;
            phone= results.data[i].phone;
            sold= results.data[i].last12monthmales;
            console.log(name);
            if (sold>20){
                $(classname).append('<p class="agent-name">'+name+'-Top Seller</p>');
            }else{
                $(classname).append('<p class="agent-name">'+name+'</p>');
            }


            $(classname).append('<table class="agent-detail"><tbody><tr><td class="agent-contact">Agency: '+agency+'</td>  <td class="agent-email">Email '+email+'</td> <td class="agent-phone">Phone: '+phone+'</td></tr></tbody></table>');

           $(classname).append('<div class="update"><input class="agent-name-box"></input>  <input class="agent-email-box"></input> <input class="agent-phone-box"></input><button class="update-agent">Update</button></div>');
           var agentNames= $(classname+' '+'.agent-name-box');
           agentNames.eq(i).val(name);
           var agentEmails=   $(classname+' '+'.agent-email-box');
           agentEmails.eq(i).val(email);
           var agentPhones=   $(classname+' '+'.agent-phone-box');
           agentPhones.eq(i).val(phone);
           var agentUpdates=   $(classname+' '+'.update-agent');
           agentUpdates.eq(i).attr('agent-id',agentid);
            //$('.agent-detail').append('<p class="agent-name">'+name+'-Top Seller</p><tr><td class="agent-contact">Agency: '+agency+'</td>  <td class="agent-email">Email '+email+'</td> <td class="agent-phone">Phone: '+phone+'</td></tr>');


        }
}
