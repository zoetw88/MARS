import math
import numpy as np

class TF_IWF: 
    def __init__(self, lines):
        self.iwf = dict()
        self.median_iwf = 0
        self.__build_iwf(lines)

    def  __get_tf (self, strs) :
        tf_dict = {}
        line_words = strs.split( " " )
        total_word_line = len(line_words) 
        for word in line_words: 
            if word not in tf_dict:                
                tf_dict[word] = 1
            else :                
                tf_dict[word] = tf_dict[word] + 1 
        for k, v in tf_dict.items():            
            tf_dict[k] = v / total_word_line 
            print(tf_dict)
        return tf_dict

    def  __build_iwf (self, lines) :
        for line in lines: 
            line_words = line.split( " " ) 
            for word in line_words: 
                if word not in self.iwf:                    
                    self.iwf[word] = 1 
                else :                     
                    self.iwf[word] = self.iwf[word] + 1        
        total_word_lines = len(self.iwf.values())            
        values = [] 
        for k, v in self.iwf.items():             
            self.iwf[k] = math.log(total_word_lines / v, 10 )             
            values.
            append(math.log(total_word_lines / v, 10)) 
            self.median_iwf = np.median(values)

    def  get_tfiwf (self, strs) :
        result = dict()
        tf_dict = self.__get_tf(strs)
        line_words = strs.split( " " ) 
        for word in line_words: 
            if word not in self.iwf.keys():                
                result[word] = tf_dict[word] *self.median_iwf 
            else :                
                result[word] = tf_dict[word] *self.iwf[word] 
        return result
                    
                

                

        


if __name__ == "__main__" : 
    lines = ['這是第一篇文章' , '這篇文章是第二篇文章' , '這是第三篇文章']     
    line = '這是第幾篇文章'    
    tfiwf = TF_IWF(lines)     
    result = tfiwf.get_tfiwf(line)     
    print(result)
        
        
