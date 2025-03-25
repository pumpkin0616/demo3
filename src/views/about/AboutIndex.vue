<template>
  <div>
    <el-card v-for="(item, index) in userList" :key="index" class="user-card">
      <h3>{{ item.name }}</h3>

      <!-- 遍历映射表，按行渲染 -->
      <div v-for="(fields, rowIndex) in getFieldMapping(item.type)" :key="rowIndex">
        <el-row :gutter="20">
          <el-col v-for="(field, key) in fields" :key="key" :span="4">
            <strong>{{ field.label }}：</strong>

            <!-- 判断是否需要 popover -->
            <template v-if="field.popover">
              <el-popover placement="top" trigger="hover">
                <div>{{ formatValue(item[key], field.formatter) }}</div>
                <template #reference>
                  <span class="popover-text">{{ formatValue(item[key], field.formatter) }}</span>
                </template>
              </el-popover>
            </template>

            <!-- 普通展示 -->
            <template v-else>
              {{ formatValue(item[key], field.formatter) }}
            </template>
          </el-col>
        </el-row>
      </div>

    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userList: [
        {
          type: 'personal',
          name: '张三',
          customerId: 'P12345',
          idType: '身份证',
          idNumber: '123456789012345678',
          nationality: '中国',
          gender: '男',
          birthDate: '1990-01-01',
          idExpiry: '2030-12-31',
          account: '100001',
          occupation: '工程师',
          address: '北京市朝阳区',
          contact: '13888888888'
        },
        {
          type: 'entity',
          name: 'XX公司',
          customerId: 'E67890',
          idType: '企业营业执照',
          idNumber: '789012345678901234',
          registrationPlace: '上海',
          idExpiry: '2028-06-30',
          account: '200002',
          address: '上海市浦东新区',
          contact: '021-88888888'
        }
      ],
      fieldMappings: {
        personal: [
          {
            customerId: { label: '客户号' },
            idType: { label: '证件类型' },
            idNumber: { label: '证件号码', popover: true, formatter: 'maskId' }, // 证件号码脱敏
            nationality: { label: '国籍' },
            gender: { label: '性别' },
            birthDate: { label: '出生日期', formatter: 'formatDate' }, // 日期格式化

          },
          {
            idExpiry: { label: '证件有效期', formatter: 'formatDate' },
            account: { label: '账号' },
            occupation: { label: '职业' },
            address: { label: '地址' },
            contact: { label: '联系方式', popover: true, formatter: 'maskPhone' } // 手机号脱敏
          }
        ],
        entity: [
          {
            customerId: { label: '客户号' },
            idType: { label: '证件类型' },
            idNumber: { label: '证件号码', popover: true, formatter: 'maskId' }, // 证件号码脱敏
            registrationPlace: { label: '公司注册地' },
            idExpiry: { label: '证件有效期', formatter: 'formatDate' },
            account: { label: '账号' }
          },
          {
            address: { label: '地址' },
            contact: { label: '联系方式', popover: true, formatter: 'maskPhone' } // 手机号脱敏
          }
        ]
      }
    };
  },
  methods: {
    getFieldMapping (type) {
      return this.fieldMappings[type] || [];
    },
    formatValue (value, formatter) {
      if (!value) return '-';
      switch (formatter) {
        case 'maskId':
          return value.replace(/^(.{6}).+(.{4})$/, '$1****$2'); // 证件号码脱敏
        case 'maskPhone':
          return value.replace(/^(\d{3})\d*(\d{4})$/, '$1****$2'); // 手机号脱敏
        case 'formatDate':
          return value.replace(/-/g, '/'); // 简单日期格式转换
        default:
          return value;
      }
    }
  }
};
</script>

<style scoped>
.user-card {
  margin-bottom: 20px;
  padding: 15px;
}
.popover-text {
  display: inline-block;
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  color: #409EFF;
}
</style>
