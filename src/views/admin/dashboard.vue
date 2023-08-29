<template>
	<div style="height: 100%;padding-top: 12px;box-sizing: border-box;">
		<el-row
			:gutter="40"
			style="height: 100%;">
			<el-col :span="16">
				<div class="c-l">
					<el-row :gutter="20">
						<el-col :span="6">
							<div class="panel">
								<div class="panel-top">
									<div class="panel-icon daily">
										<el-icon>
											<Daily :size="24" />
										</el-icon>
									</div>
									<div class="panel-name">
										<p class="name">日活跃用户数量</p>
										<p class="label">Daily Active User</p>
									</div>
								</div>
								<div class="panel-bottom">
									<div class="value">12138</div>
									<div class="tendency">
										<span class="tendency-value up">+25</span>
										<el-icon color="#FF2D55">
											<CaretTop />
										</el-icon>
									</div>
								</div>
							</div>
						</el-col>
						<el-col :span="6">
							<div class="panel">
								<div class="panel-top">
									<div class="panel-icon monthly">
										<el-icon>
											<Monthly :size="24" />
										</el-icon>
									</div>
									<div class="panel-name">
										<p class="name">月活跃用户数量</p>
										<p class="label">Monthly Active User</p>
									</div>
								</div>
								<div class="panel-bottom">
									<div class="value">12138</div>
									<div class="tendency">
										<span class="tendency-value up">+45</span>
										<el-icon color="#FF2D55">
											<CaretTop />
										</el-icon>
									</div>
								</div>
							</div>
						</el-col>
						<el-col :span="6">
							<div class="panel">
								<div class="panel-top">
									<div class="panel-icon users">
										<el-icon>
											<Users :size="24" />
										</el-icon>
									</div>
									<div class="panel-name">
										<p class="name">用户数量</p>
										<p class="label">Number of users</p>
									</div>
								</div>
								<div class="panel-bottom">
									<div class="value">112138</div>
									<div class="tendency">
										<span class="tendency-value down">-5</span>
										<el-icon color="#2BC150">
											<CaretBottom />
										</el-icon>
									</div>
								</div>
							</div>
						</el-col>
						<el-col :span="6">
							<div class="panel">
								<div class="panel-top">
									<div class="panel-icon article">
										<el-icon :size="24">
											<ChatLineRound />
										</el-icon>
									</div>
									<div class="panel-name">
										<p class="name">发帖数量</p>
										<p class="label">Published articles</p>
									</div>
								</div>
								<div class="panel-bottom">
									<div class="value">1138</div>
								</div>
							</div>
						</el-col>
					</el-row>

					<el-row style="height: 100%; margin-top: 20px;">
						<el-col>
							<div class="panel">
								<div class="title">用户活跃区域</div>
								<div id="map"></div>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-col>
			<el-col
				:span="6"
				:offset="1">
				<div class="c-r">
					<div class="panel">
						<div class="title">用户年龄分布</div>
						<div id="age"></div>
					</div>
					<div class="panel" style="margin-top: 20px;">
						<div class="title">用户访问来源</div>
						<div id="device"></div>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import * as echarts from 'echarts';
import china from '@/assets/json/china.json';

onMounted(() => {
	const chart = echarts.init(document.getElementById('map'));
	echarts.registerMap('china', china as any);
	chart.setOption({
		legend: {
			show: true,
		},
		dataRange: {
			left: 20,
			bottom: 20,
			splitList: [
				{ start: 501, label: '> 500  极高', color: '#A473E5' },
				{ start: 251, end: 500, label: '251 - 500  高', color: '#bba1cb' },
				{ start: 101, end: 250, label: '101 - 250  中', color: '#dcc7e1' },
				{ start: 0, end: 100, label: '0 - 100  低', color: '#ffe5db' },
			],
		},
		series: [
			{
				type: 'map',
				map: 'china',
				roam: true,
				showLegendSymbol: false,
				label: {
					show: false,
					fontSize: 10,
					color: 'white',
				},
				itemStyle: {
					areaColor: '#eaecf5',
					borderColor: 'white',
					borderWidth: '2',
				},
				zoom: 1.2,
				data: [
					{ name: '重庆市', value: 205 },
					{ name: '天津市', value: 157 },
					{ name: '上海市', value: 318 },
					{ name: '北京市', value: 92 },
					{ name: '四川省', value: 40 },
					{ name: '湖北省', value: 900 },
				],
				scaleLimit: {
					max: 4,
					min: 1,
				},
				select: {
					itemStyle: {
						areaColor: '#A473E5',
						borderColor: 'white',
						borderWidth: '2',
					},
				},
				emphasis: {
					itemStyle: {
						areaColor: '#A473E5',
						borderColor: 'white',
						borderWidth: '2',
					},
					label: {
						color: '#001e3b',
					},
				},
			},
		],
	});
});
</script>

<style scoped lang="scss">
.container {
	display: flex;
	flex-direction: row;
}

.c-l,
.c-r {
	display: flex;
	flex-direction: column;
	height: 100%;
}

.panel {
  display: flex;
  flex-direction: column;
	width: 100%;
	height: 100%;
	background-color: #ffffff;
	border-radius: 16px;
	padding: 20px;
	box-sizing: border-box;
	margin: 0 12px;
	transition: all 0.2s;

	&:hover {
		transform: translateY(-4px) scale(1.02);
		box-shadow: 0 14px 24px rgba($color: #000000, $alpha: 0.2);
	}

	#map {
		width: 100%;
		height: 100%;
	}

	.title {
		margin: 0 0 10px;
		color: #001e3b;
		font-size: 16px;
		font-weight: 700;
		line-height: 24px;
	}

	.panel-top {
		display: flex;
		align-items: center;
	}
	.panel-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 0 0 40px;
		height: 40px;
		border-radius: 10px;

		.el-icon {
			color: #ffffff;
		}

		&.daily {
			background-color: #ff9500;
		}

		&.monthly {
			background-color: #34c759;
		}

		&.users {
			background-color: #0a84ff;
		}

		&.article {
			background-color: #ff2d55;
		}
	}
	.panel-name {
		margin-left: 5px;

		.name {
			color: #001e3b;
			font-size: 16px;
			line-height: 23px;
			font-weight: 500;
		}

		.label {
			margin-top: 2px;
			color: rgba($color: #001e3b, $alpha: 0.36);
			font-size: 13px;
			line-height: 15px;
			font-weight: 400;
		}
	}
	.panel-bottom {
		display: flex;
		align-items: flex-end;
		margin-top: 20px;

		.value {
			color: #001e3b;
			font-size: 30px;
			line-height: 25px;
			font-weight: 400;
			vertical-align: bottom;
		}

		.tendency {
			display: flex;
			align-items: flex-end;
			margin-left: 16px;
		}

		.tendency-value {
			margin-right: 2px;
			font-size: 14px;
			line-height: 16px;
			font-weight: 400;

			&.up {
				color: #ff2d55;
			}

			&.down {
				color: #2bc150;
			}
		}
	}
}
</style>
