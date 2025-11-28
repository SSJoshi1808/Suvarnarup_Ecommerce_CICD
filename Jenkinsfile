
//Trial 25/11
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

//         /* ------------------------------ */
//         /* 1. FRONTEND BUILD */
//         /* ------------------------------ */
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

//         /* ------------------------------ */
//         /* 2. BACKEND INSTALL */
//         /* ------------------------------ */
//         stage('Install Backend') {
//             steps {
//                 dir('backend') {
//                     container('node') {
//                         sh 'npm install'
//                     }
//                 }
//             }
//         }

//         /* ------------------------------ */
//         /* 3. DOCKER IMAGE BUILD */
//         /* ------------------------------ */
//         stage('Build Docker Images') {
//             steps {
//                 container('dind') {
//                     sh '''
//                         sleep 10

//                         docker build -t ecommerce-frontend:latest -f frontend/Dockerfile frontend/
//                         docker build -t ecommerce-backend:latest -f backend/Dockerfile backend/
//                     '''
//                 }
//             }
//         }

//         /* ------------------------------ */
//         /* 4. SONARQUBE */
//         /* ------------------------------ */
//         stage('SonarQube Analysis') {
//             steps {
//                 container('sonar-scanner') {
//                     sh '''
//                         sonar-scanner \
//                           -Dsonar.projectKey=ecommerce_project \
//                           -Dsonar.sources=frontend,backend \
//                           -Dsonar.host.url=http://my-sonarqube-sonarqube.sonarqube.svc.cluster.local:9000 \
//                           -Dsonar.token=sqp_5ebc0a690cbe1f0fd4fd682557828d8117b6c229
//                     '''
//                 }
//             }
//         }

//         /* ------------------------------ */
//         /* 5. LOGIN TO NEXUS (HTTP + WORKING) */
//         /* ------------------------------ */
//         /* 5. LOGIN TO NEXUS */
// /* 5. LOGIN TO NEXUS (FINAL WORKING SOLUTION) */
// stage('Login to Nexus Registry') {
//     steps {
//         container('dind') {
//             sh '''
//                 echo "Fixing Docker daemon for HTTP Nexus registry..."

//                 # Create config folder
//                 mkdir -p /etc/docker

//                 # Write insecure registry configuration
//                 cat <<EOF >/etc/docker/daemon.json
// {
//   "insecure-registries": ["nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"]
// }
// EOF

//                 echo "Restarting Docker daemon (DinD internal)..."
//                 pkill dockerd || true
//                 dockerd &

//                 echo "Waiting for dockerd to fully start..."
//                 sleep 20

//                 echo "Logging into Nexus..."
//                 echo "Imcc@2025" | docker login \
//                     nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085 \
//                     --username student \
//                     --password-stdin
//             '''
//         }
//     }
// }

// /* 6. PUSH IMAGES */
// stage('Push to Nexus') {
//     steps {
//         container('dind') {
//             sh '''
//                 echo "Tagging images for Nexus..."

//                 docker tag ecommerce-frontend:latest \
//                   nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/shreya_joshi_repo/ecommerce-frontend:v1

//                 docker tag ecommerce-backend:latest \
//                   nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/shreya_joshi_repo/ecommerce-backend:v1

//                 echo "Pushing images..."

//                 docker push \
//                   nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/shreya_joshi_repo/ecommerce-frontend:v1

//                 docker push \
//                   nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/shreya_joshi_repo/ecommerce-backend:v1
//             '''
//         }
//     }
// }

//         /* ------------------------------ */
//         /* 7. DEPLOY TO KUBERNETES */
//         /* ------------------------------ */
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


//trial 2
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
//     - name: DOCKER_OPTS
//       value: "--insecure-registry=nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"

//   volumes:
//   - name: kubeconfig-secret
//     secret:
//       secretName: kubeconfig-secret
// '''
//         }
//     }


//working
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
    image: lachlanevenson/k8s-kubectl:latest
    command:
      - sh
      - -c
      - cat
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
    args:
      - "--storage-driver=overlay2"
      - "--insecure-registry=nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"
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

        stage('Install Backend') {
            steps {
                dir('backend') {
                    container('node') {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                container('dind') {
                    sh '''
                        docker build -t ecommerce-frontend:latest -f frontend/Dockerfile frontend/
                        docker build -t ecommerce-backend:latest -f backend/Dockerfile backend/
                    '''
                }
            }
        }

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







//         //test
//         stage('Create ImagePull Secret') {
//     steps {
//         container('kubectl') {
//             sh '''
//                 echo "Creating/Updating nexus-secret..."

//                 kubectl delete secret nexus-secret -n ecommerce --ignore-not-found=true

//                 kubectl create secret docker-registry nexus-secret \
//                   --docker-server=nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085 \
//                   --docker-username=student \
//                   --docker-password=Imcc@2025 \
//                   -n ecommerce

//                 echo "Secret created successfully!"
//             '''
//         }
//     }
// }

///------------------------------------------------------------------------------------

       

     /* 5. LOGIN TO NEXUS */
        // stage('Login to Nexus Registry') {
        //     steps {
        //         container('dind') {
        //             sh '''
        //                 docker login http://nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085 \
        //                     -u student -p Imcc@2025
        //             '''
        //         }
        //     }
        // }
        stage('Login to Nexus Registry') {
            steps {
                container('dind') {
                    sh '''
                        docker login http://nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085 \
                            -u student -p Imcc@2025
                    '''
                }
            }
        }




        /* 6. PUSH IMAGES TO NEXUS */
    //    stage('Push to Nexus') {
    //         steps {
    //             container('dind') {
    //                 sh '''
    //                     # Tag images correctly inside project folder
    //                     docker tag ecommerce-frontend:latest \
    //                     nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/shreya_joshi_repo/ecommerce-frontend:v1

    //                     docker tag ecommerce-backend:latest \
    //                     nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/shreya_joshi_repo/ecommerce-backend:v1

    //                     # Push to Nexus registry
    //                     docker push nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/shreya_joshi_repo/ecommerce-frontend:v1
    //                     docker push nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/shreya_joshi_repo/ecommerce-backend:v1
    //                 '''
    //             }
    //         }
    //     }



    //test
    /* 6. PUSH IMAGES TO NEXUS */
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


    
    

       stage('Deploy to Kubernetes') {
    steps {
        container('kubectl') {
            sh '''
                echo "======= Using kubeconfig ======="
                ls -l /kube
                cat /kube/config || true

                echo "======= Applying Deployment ======="
                kubectl apply -f k8s/deployment.yaml

                echo "======= Applying Service ======="
                kubectl apply -f k8s/service.yaml

                echo "======= Rollout Status ======="
                kubectl rollout status deployment/ecommerce-frontend -n 2401080 --timeout=60s || true
                kubectl rollout status deployment/ecommerce-backend -n 2401080 --timeout=60s || true

                echo "======= Pods ======="
                kubectl get pods -n 2401080
            '''
        }
    }
}


}
}
