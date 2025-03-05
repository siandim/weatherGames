import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { CloudData, cloudData } from "../cloudGame/cloudData"
import styles from "../cloudGame/cloudGame.module.css"
function CloudDiagram() {
  const [selectedCloud, setSelectedCloud] = useState<CloudData | null>(null);

  const handleCloudClick = (cloudName: keyof typeof cloudData) => {
    setSelectedCloud(cloudData[cloudName]);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <img 
        src="img/cloudGames/cloudposter.jpg" 
        alt="Cloud types" 
        className="w-full h-auto"
      />
      
      {Object.entries(cloudData).map(([key, cloud]) => (
        <motion.button
          key={key}
          className={`${cloud.colorClass} ${styles.cloudButton}`}
          style={cloud.position}
          onClick={() => handleCloudClick(key as keyof typeof cloudData)}
          whileHover={{ scale: 1.1 }}
        >
          {cloud.name}
        </motion.button>
      ))}

      <Dialog.Root open={!!selectedCloud} onOpenChange={() => setSelectedCloud(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">
            {selectedCloud && (
              <>
                <Dialog.Title className="text-xl font-bold mb-2">{selectedCloud.name}</Dialog.Title>
                <Dialog.Description className="text-gray-600 mb-4">{selectedCloud.description}</Dialog.Description>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Altitude</h3>
                    <p className="text-gray-600">{selectedCloud.altitude}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Characteristics</h3>
                    <ul className="list-disc pl-5 text-gray-600">
                      {selectedCloud.characteristics.map((char, index) => (
                        <li key={index}>{char}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Dialog.Close asChild>
                  <button className={styles.closeButton}>
                    X
                  </button>
                </Dialog.Close>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default CloudDiagram;