/*
 * @Date: 2025-03-24 16:19:20
 * @LastEditTime: 2025-03-25 13:38:12
 */
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { Threebox } from 'threebox-plugin';
import * as THREE from 'three';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import './App.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyYWJsZXp6eiIsImEiOiJjbTg3bmc0cnQwaDk3MnFwc2M4YmhodndoIn0.jCgi76WKYLwbMxEv_siuWA';

function App () {
  const SCALE = 0.65;
  const MODEL_COORDINATES = [106.514698, 29.520672]
  const ROTATION = { x: 90, y: 32, z: 0 }
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map', // 对应 HTML 中的 div id
      style: 'mapbox://styles/mapbox/streets-v11', // 地图样式
      center: [106.515298, 29.513572], // 替换为你的经纬度
      zoom: 15.5,
      minZoom: 15.5,
      maxZoom: 20,
      // 3d倾斜视图
      pitch: 40,
      bearing: 53,
    });
    map.addControl(new MapboxLanguage({
        defaultLanguage: 'zh-Hans'
    }));

    // 初始化threebox
    const tb = (window.tb = new Threebox(
      map,
      map.getCanvas().getContext('webgl'),
      {
        defaultLights: true
      }
    ))

    map.on('load', () => {

      map.addLayer({
        id: 'custom-threebox-model',
        type: 'custom',
        renderingMode: '3d',
        onAdd: function () {
          const scale = SCALE
          const options = {
            obj: 'https://tbai.oss-cn-chengdu.aliyuncs.com/mzc/mzc.glb',
            type: 'glb',
            scale: { x: scale, y: scale, z: scale },
            units: 'meters',
            rotation: ROTATION
          }

          // 添加灯光
          // const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // 环境光
          // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2); // 平行光
          // directionalLight.position.set(100, 100, 800); // 设置平行光的位置
          // const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.2); // 平行光
          // directionalLight2.position.set(-100, -100, 800); // 设置平行光的位置
          // tb.scene.add(ambientLight);
          // tb.scene.add(directionalLight);
          // tb.scene.add(directionalLight2);

          tb.loadObj(options, (model) => {
            model.setCoords(MODEL_COORDINATES)
            model.setRotation({ x: 0, y: 0, z: 241 })
            tb.add(model)
          })
        },

        render: function () {
          tb.update()
        }
      })
    })

    return () => map.remove();
  }, []);

  return (
    <>
      <div id="map" style={{ width: '100%', height: '100vh' }}></div>
    </>
  );
}

export default App;
