<template>
	<div class="container">
		<div class="table">
			<el-table
				:data="dataList"
				height="650">
				<el-table-column
					prop="nickname"
					label="操作人"
					align="center"></el-table-column>
				<el-table-column
					prop="ip"
					label="IP"
					align="center"></el-table-column>
				<el-table-column
					prop="platform"
					label="设备类型"
					align="center"></el-table-column>
				<el-table-column
					prop="os"
					label="设备系统"
					align="center"></el-table-column>
				<el-table-column
					prop="browser"
					label="访问源"
					align="center"
					width="200"
					show-overflow-tooltip></el-table-column>
				<el-table-column
					prop="method"
					label="请求接口"
					align="center"></el-table-column>
				<el-table-column
					prop="args"
					label="入参"
					align="center"></el-table-column>
				<el-table-column
					prop="opType"
					label="操作类型"
					align="center"></el-table-column>
				<el-table-column
					prop="description"
					label="操作描述"
					align="center"></el-table-column>
				<el-table-column
					prop="longTime"
					label="处理耗时"
					align="center"></el-table-column>
				<el-table-column
					prop="result"
					label="请求结果"
					align="center">
					<template v-slot="scope">
            <el-tag :type="scope.row.result ? 'success' : 'danger'">
              {{ scope.row.result ? '成功' : '失败' }}
            </el-tag>
					</template>
				</el-table-column>
				<el-table-column
					prop="createTime"
					label="请求时间"
					align="center"></el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination
					:total="total"
					v-model:current-page="current"
					v-model:page-size="size"
					:page-sizes="[20, 30, 50, 100, 200, 500]"
					background
					layout="total, sizes, prev, pager, next, jumper"></el-pagination>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getLog } from '@/api/common';
import { total, current, size, changePageSize } from '@/mixins';

const dataList = ref<Log[]>([]);

const getDataList = () => {
	getLog({
		size: size.value,
		current: current.value,
	}).then((res: Res) => {
		if (res.code === 200) {
			const { data } = res;
			dataList.value = data.data;
			total.value = data.total;
		}
	});
};

onMounted(() => {
	getDataList();
});

changePageSize(getDataList);
</script>

<style scoped lang="scss"></style>
