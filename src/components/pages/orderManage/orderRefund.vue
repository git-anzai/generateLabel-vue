<template>
  <Content :style="{padding: '0 16px 16px'}">
    <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>订单管理</BreadcrumbItem>
      <BreadcrumbItem>退款售后</BreadcrumbItem>
    </Breadcrumb>
     <Card>
      <div :style="{minHeight:contentHeight+'px'}">
        <Modal
          v-model="modal"
          title="添加订单并生成面单"
          ok-text="添加订单并生成面单"
          cancel-text="取消"
          @on-ok="addGoods"
          ><!--@on-visible-change="handleReset('formInline')"-->
          <Form :label-width="80" ref="formInline" inline>
            <FormItem label="买家昵称:">
              <Input type="text" placeholder="请输入买家昵称" v-model="order.buyerName"></Input>
            </FormItem>
            <FormItem label="手机号:">
              <Input type="text" placeholder="请输入手机号" v-model="order.buyerMobile"></Input>
            </FormItem>
            <FormItem label="省份:">
              <Input type="text" placeholder="请输入省份" v-model="order.buyer_province"></Input>
            </FormItem>
            <FormItem label="城市:">
              <Input type="text" placeholder="请输入城市" v-model="order.buyer_city"></Input>
            </FormItem>
            <FormItem label="地区:">
              <Input type="text" placeholder="请输入地区" v-model="order.buyer_district"></Input>
            </FormItem>
            <FormItem label="地址:">
              <Input type="text" placeholder="请输入地址" v-model="order.buyer_address"></Input>
            </FormItem>
            <FormItem label="物流类型:">
              <Select style="width:160px;" placeholder="请选择"  v-model="order.logistics_type">
                <Option value="ZTO">中通</Option >
              </Select >
            </FormItem>
          </Form>
        </Modal>
        <Button type="primary" @click="modal = true">手工添加订单并生成面单</Button>
        <Table :height="tableHeight" border ref="selection" :columns="pageData.columns" :data="pageData.data" style="margin-top: 18px"></Table>
        <Page style="text-align: right;margin-top: 10px;" :total="pageData.totalCount" show-elevator show-total
              :page-size="pageData.pageSize" :current="pageData.pageCurrent+1" @on-change="handleChange"></Page>
      </div>
    </Card>
  </Content>
</template>
<script>
  export default {
   data() {
      return {
        modal:false,
        order: {
          buyerName:'',
          buyerMobile:'',
          buyer_province:'',
          buyer_city:'',
          buyer_district:'',
          buyer_address:'',
          logistics_type:''
        },
        contentHeight: 0,
        tableHeight: 0,
        searchData: {
          order: '',
          mobile: '',
          buyerName: '',
        },
        pageData: {
          columns: [
            {
              title: 'id',
              key: 'id',
              align: 'center',
              width: 60,
            },
            {
              title: '订单号',
              key: 'order_code',
              align: 'center',
            },
            {
              title: '下单时间',
              key: 'create_time',
              align: 'center',
            },
            {
              title: '买家昵称',
              key: 'buyer_name',
              align: 'center',
            },
            {
              title: '手机号',
              key: 'buyer_mobile',
              align: 'center',
            },
            {
              title: '卖家备注',
              key: 'buyer_make',
              align: 'center',
            },
            {
              title: '详细地址',
              key: 'buyer_address',
              align: 'center',
            },
            {
              title: '货品名称',
              key: 'goods_name',
              align: 'center',
            },
            {
              title: '数量',
              key: 'goods_count',
              align: 'center',
              width: 70,
            },
            {
              title: '运单号',
              key: 'logistics_num',
              align: 'center',
            },
            {
              title: '订单状态',
              key: 'order_status',
              align: 'center',
            },
          ],
          data: [],
          totalCount: 0,
          pageCurrent: 0,
          pageSize: 0,
        },
      }
    },
    mounted() {
      this.tableHeight = Number(window.innerHeight - 300);
      this.contentHeight = Number(window.innerHeight - 170);
      this.queryTable();
    },
    methods: {
      handleChange(count) {
        count = count - 1;
        this.queryTable(count);
      },
      queryTable(curPage) {
        const _this = this;
        curPage = curPage ? curPage : 0;
        let params = {
          "order": _this.searchData.order,
          "mobile": _this.searchData.mobile,
          "buyerName": _this.searchData.buyerName,
          "pageCurrent": curPage,
          "pageSize": '',
        }
        _this.$http.getData(_this.Api.GET_ORDER_LIST, params).then(res => {
          if (res.success) {
            _this.pageData.data = res.data.list;
            this.pageData.totalCount = parseInt(res.data.totalCount);
            this.pageData.pageSize = parseInt(res.data.pageSize);
            this.pageData.pageCurrent = parseInt(res.data.pageCurrent);
          } else {
          }
        })
      },
      addGoods() {
        let params = {
          data:this.order
        }
        this.$http.post(this.Api.ORDER_GENERATE, params).then(res => {
          console.log(res)
          if (res.success) {
            window.open(`http://dev.shijijiaming.cn:3000/apis/getLabel?code=${res.code}`, '_self');
          }
        })
      }
    },
  }
</script>
