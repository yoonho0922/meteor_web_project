FlowRouter.template('/rev_myPosts/:area/:tag/:order','rev_myPosts')

Template.rev_myPosts.helpers({
    boards: function() {
        var area = FlowRouter.getParam('area');
        var tag = FlowRouter.getParam('tag');
        var order = FlowRouter.getParam('order')
        if(area=='전체'&&tag=='전체'){
            if(order=='rec'){
                return DB_REVS.findAll({user_id:Meteor.user()._id}, {sort: {recommend: -1}});
            }else{
                return DB_REVS.findAll({user_id:Meteor.user()._id}, {sort: {createdAt: -1}});
            }
        }else if(area=='전체'){
            if(order=='rec'){
                return DB_REVS.findAll({user_id:Meteor.user()._id,'posting_tag': tag}, {sort: {recommend: -1}});
            }else{
                return DB_REVS.findAll({user_id:Meteor.user()._id,'posting_tag': tag}, {sort: {createdAt: -1}});
            }

        }else if(tag=='전체'){
            if(order=='rec'){
                return DB_REVS.findAll({user_id:Meteor.user()._id,'posting_area': area}, {sort: {recommend: -1}});
            }else{
                return DB_REVS.findAll({user_id:Meteor.user()._id,'posting_area': area}, {sort: {createdAt: -1}});
            }
        }else{
            if(order=='rec'){
                return DB_REVS.findAll({user_id:Meteor.user()._id,'posting_area': area, 'posting_tag': tag}, {sort: {recommend: -1}});
            }else{
                return DB_REVS.findAll({user_id:Meteor.user()._id,'posting_area': area, 'posting_tag': tag}, {sort: {createdAt: -1}});
            }
        }

    },
    YMD: function() {
        return this.createdAt.toStringYMD();
    },
    HMS: function() {
        return this.createdAt.toStringHMS();
    },
    nickname: function() {
        var user_id = this.user_id;
        return Meteor.users.findOne({_id: user_id}).profile.nickname;
    },
    rec_img: function () {
        var post_id = this._id
        var user = Meteor.user()

        if(user == null){   //로그아웃 상태일 시
            return 'rec_normal.png';
        }
        // 로그인 상태일 시

        //유저가 this 게시글을 추천했는지 안했는지 판별
        if(!DB_RECOMMEND.findOne({post_id : post_id, user_id : user._id})){
            return 'rec_normal.png';
        }else{
            return 'rec_over.png';
        }
    }

});

Template.rev_myPosts.helpers({

    area : function(){
        var area = FlowRouter.getParam('area');
        if(!area){
            return '전체';
        }
        return area;
    },
    tag : function(){
        var tag = FlowRouter.getParam('tag');
        if(!tag){
            return '전체';
        }
        return tag;
    },
    order : function(){
        var order = FlowRouter.getParam('order');
        if(!order){
            return 'new';
        }
        return order;
    },
    link: function() {
        // 저장 된 이미지 링크를 반환
        return DB_FILES.findOne({_id: this.file_id}).link()

    },

    //버튼 활성화 비활성화
    activated30: function(){
        if(FlowRouter.getParam('order') == 'new'){  //최신순일 때
            return 'background-color : gray; color : white;';
        }
        return;
    },
    activated31: function(){
        if(FlowRouter.getParam('order') == 'rec'){  //추천순일 때
            return 'background-color : gray; color : white;';
        }
        return;
    },
    activated0: function(){
        if(FlowRouter.getParam('tag') == '전체'){
            return 'background-color : skyblue; color : white;';
        }
        return;
    },
    activated1: function(){
        if(FlowRouter.getParam('tag') == '한식'){
            return 'background-color : skyblue; color : white;';
        }
        return;
    },
    activated2: function(){
        if(FlowRouter.getParam('tag') == '일식'){
            return 'background-color : skyblue; color : white;';
        }
        return;
    },
    activated3: function(){
        if(FlowRouter.getParam('tag') == '중식'){
            return 'background-color : skyblue; color : white;';
        }
        return;
    },
    activated4: function(){
        if(FlowRouter.getParam('tag') == '양식'){
            return 'background-color : skyblue; color : white;';
        }
        return;
    },
    activated5: function(){
        if(FlowRouter.getParam('tag') == '분식'){
            return 'background-color : skyblue; color : white;';
        }
        return;
    },
    activated6: function(){
        if(FlowRouter.getParam('tag') == '카페'){
            return 'background-color : skyblue; color : white;';
        }
        return;
    },
    activated7: function(){
        if(FlowRouter.getParam('tag') == '포차'){
            return 'background-color : skyblue; color : white;';
        }
        return;
    },
    activated8: function(){
        if(FlowRouter.getParam('tag') == '기타'){
            return 'background-color : skyblue; color : white;';
        }
        return;
    }
});