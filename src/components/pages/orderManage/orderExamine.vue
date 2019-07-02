<template>
  <Content :style="{padding: '0 16px 16px'}">
    <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>订单管理</BreadcrumbItem>
      <BreadcrumbItem>订单审核</BreadcrumbItem>
    </Breadcrumb>
    <Card>
      <div :style="{minHeight:contentHeight+'px'}" class="ss">
        <Form :label-width="68" ref="formInline" inline>
          <FormItem label="订单号:">
            <Input type="text" placeholder="请输入订单号" v-model="searchData.order"></Input>
          </FormItem>
          <FormItem label="手机号:">
            <Input type="text" placeholder="请输入手机号" v-model="searchData.mobile"></Input>
          </FormItem>
          <FormItem label="买家昵称:">
            <Input type="text" placeholder="请输入买家昵称" v-model="searchData.buyerName"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="queryTable()">查询</Button>
          </FormItem>
          <FormItem>
            <Upload
              :show-upload-list="false"
              :format="['xlsx']"
              :on-format-error="handleFormatError"
              :on-success="handleSuccess"
              action="http://dev.shijijiaming.cn:3000/apis/orderUpload"
              style="margin-left: 18px;">
              <!--:data="{'service': Api.VENUS_ERP_ORDERONLINE_ORDER_IMPORT}"-->
              <Button type="primary">导入订单</Button>
            </Upload>
          </FormItem>
        </Form>
        <Table :height="tableHeight" border ref="selection" :columns="pageData.columns" :data="pageData.data"
               @on-selection-change="selectRow"></Table>
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
            {
              title: '操作',
              key: 'action',
              align: 'center',
              render: (h, params) => {
                let actionBtn = []
                actionBtn = [
                  h('Button', {
                    props: {
                      size: 'small',
                      type: 'success',
                      disabled: params.row.order_status == 1 ? true : false
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: '提示',
                          content: '确定要打印面单吗？',
                          onOk: () => {
                            this.goWarehouse(params.row);
                          }
                        })
                      }
                    }
                  }, '打印面单'),
                ]
                return h('div', actionBtn);
              }
            }
          ],
          data: [],
          totalCount: 0,
          pageCurrent: 0,
          pageSize: 0,
          selection: []
        },
      }
    },
    mounted() {
      this.tableHeight = Number(window.innerHeight - 318);
      this.contentHeight = Number(window.innerHeight - 170);
      this.queryTable();
    },
    methods: {
      handleFormatError() {
        this.$Message.warning({
          content: '文件格式不符，请选择.xlsx格式的文件上传',
          duration: 3,
          closable: true
        });
      },
      handleSuccess(res, file) {
        this.$Message.warning({
          content: res.message,
          duration: 3,
          closable: true
        });
      },
      goWarehouse(paramsRow) {
        let params = {
          data: {
            logistics_type: paramsRow.logistics_type,
            id: paramsRow.id,
            buyerName: paramsRow.buyer_name,
            buyerMobile: paramsRow.buyer_mobile,
            buyer_province: paramsRow.buyer_province,
            buyer_district: paramsRow.buyer_district,
            buyer_city: paramsRow.buyer_city,
            buyer_address: paramsRow.buyer_address,
            order_code: paramsRow.order_code
          }
        }
        this.$http.post(this.Api.GENERATE_LABEL, params).then(res => {
          if (res.success) {
            this.getLable(res.code)
          }
        })
      },
      getLable(code) {
        window.open(`http://dev.shijijiaming.cn:3000/apis/getLabel?code=${code}`, '_self');
        this.queryTable();
      },
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
          }
        })
      },
      selectRow(selection) {
        this.pageData.selection = []
        if (selection.length == 1) {
          this.pageData.selection.push(selection[0].id)
        } else if (selection.length > 1) {
          for (let item in selection) {
            this.pageData.selection.push(selection[item].id);
          }
        }
      }
    }
  }
</script>
