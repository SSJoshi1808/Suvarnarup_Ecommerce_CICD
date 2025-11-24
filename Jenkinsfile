// pipeline {
//     agent {
//         kubernetes {
//             yaml '''
// apiVersion: v1
// kind: Pod
// spec:
//   containers:

//   - name: node
//     image: node:18
//     command: ['cat']
//     tty: true

//   - name: sonar-scanner
//     image: sonarsource/sonar-scanner-cli
//     command: ['cat']
//     tty: true

//   - name: kubectl
//     image: bitnami/kubectl:latest
//     command: ['cat']
//     tty: true
//     env:
//     - name: KUBECONFIG
//       value: /kube/config
//     volumeMounts:
//     - name: kubeconfig-secret
//       mountPath: /kube/config
//       subPath: kubeconfig

//   - name: dind
//     image: docker:dind
//     args: ["--storage-driver=overlay2"]
//     securityContext:
//       privileged: true
//     env:
//     - name: DOCKER_TLS_CERTDIR
//       value: ""
//   volumes:
//   - name: kubeconfig-secret
//     secret:
//       secretName: kubeconfig-secret
// '''
//         }
//     }

//     stages {

//         /* --------------------------
//            1. INSTALL + BUILD FRONTEND
//         ---------------------------*/
//         stage('Install + Build Frontend') {
//             steps {
//                 dir('frontend') {
//                     container('node') {
//                         sh '''
//                             npm install
//                             npm run build
//                         '''
//                     }
//                 }
//             }
//         }

//         /* --------------------------
//            2. INSTALL BACKEND
//         ---------------------------*/
//         stage('Install Backend') {
//             steps {
//                 dir('backend') {
//                     container('node') {
//                         sh '''
//                             npm install
//                         '''
//                     }
//                 }
//             }
//         }

//         /* --------------------------
//            3. BUILD DOCKER IMAGES
//         ---------------------------*/
//         stage('Build Docker Images') {
//             steps {
//                 container('dind') {
//                     sh '''
//                         sleep 10

//                         docker build -t ecommerce-frontend:latest -f frontend/Dockerfile .
//                         docker build -t ecommerce-backend:latest -f backend/Dockerfile .
//                     '''
//                 }
//             }
//         }

//         /* --------------------------
//            4. SONARQUBE ANALYSIS
//         ---------------------------*/
//         stage('SonarQube Analysis') {
//             steps {
//                 container('sonar-scanner') {
//                     sh '''
//                         sonar-scanner \
//                             -Dsonar.projectKey=ecommerce_project \
//                             -Dsonar.sources=frontend,backend \
//                             -Dsonar.host.url=http://sonarqube.imcc.com \
//                             -Dsonar.token=sqp_5ebc0a690cbe1f0fd4fd682557828d8117b6c229
//                     '''
//                 }
//             }
//         }

//         /* --------------------------
//            5. LOGIN TO NEXUS DOCKER REGISTRY
//         ---------------------------*/
//         stage('Login to Nexus Registry') {
//             steps {
//                 container('dind') {
//                     sh '''
//                         docker login nexus.imcc.com:5000 -u admin -p Changeme@2025
//                     '''
//                 }
//             }
//         }

//         /* --------------------------
//            6. TAG & PUSH TO NEXUS
//         ---------------------------*/
//         stage('Push to Nexus') {
//             steps {
//                 container('dind') {
//                     sh '''

//                          docker tag recipe-finder:latest nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/shreya_joshi_repo/recipe-finder:v1
//                         docker push nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/shreya_joshi_repo/recipe-finder:v1

//                         // docker tag ecommerce-frontend:latest nexus.imcc.com:5000/shreya_joshi_repo/ecommerce-frontend:v1
//                         // docker tag ecommerce-backend:latest nexus.imcc.com:5000/shreya_joshi_repo/ecommerce-backend:v1

//                         // docker push nexus.imcc.com:5000/shreya_joshi_repo/ecommerce-frontend:v1
//                         // docker push nexus.imcc.com:5000/shreya_joshi_repo/ecommerce-backend:v1
//                     '''
//                 }
//             }
//         }

//         /* --------------------------
//            7. DEPLOY TO KUBERNETES
//         ---------------------------*/
//         stage('Deploy to Kubernetes') {
//             steps {
//                 container('kubectl') {
//                     sh '''
//                         kubectl apply -f k8s/deployment.yaml
//                         kubectl apply -f k8s/service.yaml

                
//                         kubectl rollout status deployment/ecommerce-frontend -n ecommerce
//                         kubectl rollout status deployment/ecommerce-backend -n ecommerce
//                     '''
//                 }
//             }
//         }
//     }
// }

//2

// pipeline {
//     agent {
//         kubernetes {
//             yaml '''
// apiVersion: v1
// kind: Pod
// spec:
//   containers:

//   - name: node
//     image: mirror.gcr.io/library/node:20
//     command: ['cat']
//     tty: true

//   - name: sonar-scanner
//     image: sonarsource/sonar-scanner-cli
//     command: ['cat']
//     tty: true

//   - name: kubectl
//     image: bitnami/kubectl:latest
//     command: ['cat']
//     tty: true
//     env:
//     - name: KUBECONFIG
//       value: /kube/config
//     volumeMounts:
//     - name: kubeconfig-secret
//       mountPath: /kube/config
//       subPath: kubeconfig

//   - name: dind
//     image: docker:dind
//     args: ["--storage-driver=overlay2"]
//     securityContext:
//       privileged: true
//     env:
//     - name: DOCKER_TLS_CERTDIR
//       value: ""

//   volumes:
//   - name: kubeconfig-secret
//     secret:
//       secretName: kubeconfig-secret
// '''
//         }
//     }

//     stages {

//         /* 1. INSTALL + BUILD FRONTEND */
//         stage('Install + Build Frontend') {
//             steps {
//                 dir('frontend') {
//                     container('node') {
//                         sh '''
//                             npm install
//                             npm run build
//                         '''
//                     }
//                 }
//             }
//         }

//         /* 2. INSTALL BACKEND */
//         stage('Install Backend') {
//             steps {
//                 dir('backend') {
//                     container('node') {
//                         sh '''
//                             npm install
//                         '''
//                     }
//                 }
//             }
//         }

//         /* 3. BUILD DOCKER IMAGES */
//         stage('Build Docker Images') {
//             steps {
//                 container('dind') {
//                     sh '''
//                         sleep 10

//                         # Correct build contexts
//                         docker build -t ecommerce-frontend:latest -f frontend/Dockerfile frontend/
//                         docker build -t ecommerce-backend:latest -f backend/Dockerfile backend/
//                     '''
//                 }
//             }
//         }

//         /* 4. SONARQUBE */
//         // stage('SonarQube Analysis') {
//         //     steps {
//         //         container('sonar-scanner') {
//         //             sh '''
//         //                 sonar-scanner \
//         //                     -Dsonar.projectKey=ecommerce_project \
//         //                     -Dsonar.sources=frontend,backend \
//         //                     -Dsonar.host.url=http://sonarqube.imcc.com \
//         //                     -Dsonar.token=sqp_5ebc0a690cbe1f0fd4fd682557828d8117b6c229
//         //             '''
//         //         }
//         //     }
//         // }
//         stage('SonarQube Analysis') {
//     steps {
//         container('sonar-scanner') {
//             sh '''
//                 sonar-scanner \
//                     -Dsonar.projectKey=ecommerce_project \
//                     -Dsonar.sources=frontend,backend \
//                     -Dsonar.host.url=http://my-sonarqube-sonarqube.sonarqube.svc.cluster.local:9000 \
//                     -Dsonar.token=sqp_5ebc0a690cbe1f0fd4fd682557828d8117b6c229
//             '''
//         }
//     }
// }


//         /* 5. LOGIN TO NEXUS */
//   stage('Login to Nexus Registry') {
//     steps {
//         container('dind') {
//             sh '''
//                 echo "Starting Docker daemon with insecure registry..."
//                 dockerd-entrypoint.sh --insecure-registry nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8083 &

//                 sleep 15

//                 docker login \
//                   http://nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8083 \
//                   -u admin -p Changeme@2025
//             '''
//         }
//     }
// }


// stage('Push to Nexus') {
//     steps {
//         container('dind') {
//             sh '''
//                 docker tag ecommerce-frontend:latest \
//                   nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8083/repository/shreya_joshi_repo/ecommerce-frontend:v1

//                 docker tag ecommerce-backend:latest \
//                   nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8083/repository/shreya_joshi_repo/ecommerce-backend:v1

//                 docker push \
//                   nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8083/repository/shreya_joshi_repo/ecommerce-frontend:v1

//                 docker push \
//                   nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8083/repository/shreya_joshi_repo/ecommerce-backend:v1
//             '''
//         }
//     }
// }



//         /* 7. DEPLOY TO K8S */
//         stage('Deploy to Kubernetes') {
//             steps {
//                 container('kubectl') {
//                     sh '''
//                         kubectl apply -f k8s/deployment.yaml
//                         kubectl apply -f k8s/service.yaml

//                         kubectl rollout status deployment/ecommerce-frontend -n ecommerce
//                         kubectl rollout status deployment/ecommerce-backend -n ecommerce
//                     '''
//                 }
//             }
//         }
//     }
// }


//Trial
pipeline {
    agent {
        kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:

  - name: node
    image: mirror.gcr.io/library/node:20
    command: ['cat']
    tty: true

  - name: sonar-scanner
    image: sonarsource/sonar-scanner-cli
    command: ['cat']
    tty: true

  - name: kubectl
    image: bitnami/kubectl:latest
    command: ['cat']
    tty: true
    env:
    - name: KUBECONFIG
      value: /kube/config
    volumeMounts:
    - name: kubeconfig-secret
      mountPath: /kube/config
      subPath: kubeconfig

  - name: dind
    image: docker:dind
    args: ["--storage-driver=overlay2"]
    securityContext:
      privileged: true
    env:
    - name: DOCKER_TLS_CERTDIR
      value: ""

  volumes:
  - name: kubeconfig-secret
    secret:
      secretName: kubeconfig-secret
'''
        }
    }

    stages {

        /* 1. FRONTEND BUILD */
        stage('Install + Build Frontend') {
            steps {
                dir('frontend') {
                    container('node') {
                        sh '''
                            npm install
                            npm run build
                        '''
                    }
                }
            }
        }

        /* 2. BACKEND INSTALL */
        stage('Install Backend') {
            steps {
                dir('backend') {
                    container('node') {
                        sh 'npm install'
                    }
                }
            }
        }

        /* 3. DOCKER BUILD */
        stage('Build Docker Images') {
            steps {
                container('dind') {
                    sh '''
                        sleep 10
                        
                        docker build -t ecommerce-frontend:latest -f frontend/Dockerfile frontend/
                        docker build -t ecommerce-backend:latest -f backend/Dockerfile backend/
                    '''
                }
            }
        }

        /* 4. SONAR */
        stage('SonarQube Analysis') {
            steps {
                container('sonar-scanner') {
                    sh '''
                        sonar-scanner \
                            -Dsonar.projectKey=ecommerce_project \
                            -Dsonar.sources=frontend,backend \
                            -Dsonar.host.url=http://my-sonarqube-sonarqube.sonarqube.svc.cluster.local:9000 \
                            -Dsonar.token=sqp_5ebc0a690cbe1f0fd4fd682557828d8117b6c229
                    '''
                }
            }
        }

        /* 5. LOGIN TO NEXUS DOCKER REGISTRY */
        stage('Login to Nexus Registry') {
            steps {
                container('dind') {
                    sh '''
                        echo "Changeme@2025" | docker login \
                            nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085 \
                            --username admin --password-stdin
                    '''
                }
            }
        }

        /* 6. PUSH IMAGES */
        stage('Push to Nexus') {
            steps {
                container('dind') {
                    sh '''
                        docker tag ecommerce-frontend:latest \
                          nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/shreya_joshi_repo/ecommerce-frontend:v1

                        docker tag ecommerce-backend:latest \
                          nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/shreya_joshi_repo/ecommerce-backend:v1

                        docker push nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/shreya_joshi_repo/ecommerce-frontend:v1
                        docker push nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/shreya_joshi_repo/ecommerce-backend:v1
                    '''
                }
            }
        }

        /* 7. DEPLOY */
        stage('Deploy to Kubernetes') {
            steps {
                container('kubectl') {
                    sh '''
                        kubectl apply -f k8s/deployment.yaml
                        kubectl apply -f k8s/service.yaml

                        kubectl rollout status deployment/ecommerce-frontend -n ecommerce
                        kubectl rollout status deployment/ecommerce-backend -n ecommerce
                    '''
                }
            }
        }
    }
}
